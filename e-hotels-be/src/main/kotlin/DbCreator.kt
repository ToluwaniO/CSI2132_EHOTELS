import com.google.gson.Gson
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import java.sql.Connection
import java.util.Random

class DbCreator {

    private val hotelNames = arrayOf("Four Points", "Coast Hotels", "Four Seasons", "Red Roof Inn", "Prince Hotels")
    private val cities = arrayOf("Toronto", "Vancouver", "Montreal", "Ottawa", "Calgary", "Gatineau", "Saskatoon", "Burnaby")
    private val employeeNames = arrayOf("Anthony Martial", "Marcus Rashford", "Jadon Sancho", "Luke Shaw")
    private val categories = arrayOf("Travel", "Resort", "Motel", "Luxury", "Family")
    private val rand = Random()

    fun createDb(connection: Connection) = transaction(Connection.TRANSACTION_SERIALIZABLE, 1) {
        val data = getDummyData()
        SchemaUtils.create(HotelChain, Hotel, HotelChainAddress, HotelChainEmail, Employee, Customer, Room,
             Rental, Booking, Damage)
        createTriggers(connection)
        val hotelChains = data["hotelChains"] as List<Map<String, Any>>?
        hotelChains?.forEach { raw ->
            HotelChain.insert {
                it[name] = raw["name"] as String
                it[category] = categories[rand.nextInt(5)]
                it[numberOfHotels] = raw["numberOfHotels"].toString().toDouble().toInt()
            }
        }

        for (i in 1..40) {
            Employee.insert {
                it[SIN] = getStringWithTrailingZeros(i, 9)
                it[name] = employeeNames[rand.nextInt(3)]
                it[hotelID] = i
                it[position] = "Manager"
                it[streetAddress] = ""
                it[city] = ""
                it[province] = ""
                it[postalCode] = ""
            }
        }

        var currentSIN = 1
        var hID = 1
        for (i in 1..5) {
            val hotelName = hotelNames[i-1]
            for (j in 1..8) {
                val sin = getStringWithTrailingZeros(currentSIN, 9)
                val phoneNo = getStringWithTrailingZeros(currentSIN, 11)
                Hotel.insert {
                    it[hotelChainID] = i
                    it[name] = "$hotelName ${cities[j-1]}"
                    it[category] = categories[rand.nextInt(5)]
                    it[roomCount] = 5
                    it[email] = ""
                    it[managerSIN] = sin
                    it[phoneNumber] = phoneNo
                    it[streetAddress] = ""
                    it[city] = ""
                    it[province] = ""
                    it[postalCode] = ""
                }

                for (k in 1..5) {
                    Room.insert {
                        it[hotelID] = hID
                        it[roomNumber] =  "$hID-${getStringWithTrailingZeros(k,4)}"
                        it[capacity] = 2
                        it[pricePerNight] = 20.0

                    }
                }
                currentSIN++
                hID++
            }
        }

        val hotChainAddresses = data["hotelChainAddress"] as List<Map<String, Any>>?
        hotChainAddresses?.forEach {raw ->
            HotelChainAddress.insert {
                it[id] = raw["id"].toString().toDouble().toInt()
                it[hotelChainID] = raw["hotelChainID"].toString().toDouble().toInt()
                it[streetAddress] = raw["streetAddress"] as String
                it[city] = raw["city"] as String
                it[province] = raw["province"] as String
                it[postalCode] = raw["postalCode"] as String
            }
        }

        val hotelChainEmail = data["hotelChainEmail"] as List<Map<String, Any>>?
        hotelChainEmail?.forEach {raw ->
            HotelChainEmail.insert {
                it[id] = raw["id"].toString().toDouble().toInt()
                it[hotelChainID] = raw["hotelChainID"].toString().toDouble().toInt()
                it[email] = raw["email"] as String
            }
        }

        val hotelChainNumbers = data["hotelChainPhoneNumbers"] as List<Map<String, Any>>?
        hotelChainNumbers?.forEach { raw ->
            HotelChainPhoneNumber.insert {
                it[id] = raw["id"].toString().toDouble().toInt()
                it[hotelChainID] = raw["hotelChainID"].toString().toDouble().toInt()
                it[phoneNumber] = raw["phoneNumber"] as String
            }
        }
    }

    private fun createTriggers(connection: Connection) {
        try {
            val triggersFile = DbCreator::class.java.getResource("triggers.sql")
            val triggers = triggersFile.readText()
            val statement = connection.createStatement()
            statement.execute(triggers)
        } catch (e: Exception) {
            println(e.message)
        }
    }

    private fun getDummyData(): Map<String, Any> {
        val data = DbCreator::class.java.getResource("data.json").readText()
        return Gson().fromJson<Map<String, Any>>(data, Map::class.java)
    }

    private fun getStringWithTrailingZeros(number: Int, len: Int): String {
        val n = "$number"
        var SIN = n
        for (i in 0 until (len-n.length)) {
            SIN = "0$SIN"
        }
        return SIN
    }
}