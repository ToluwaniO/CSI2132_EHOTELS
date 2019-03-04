import com.google.gson.Gson
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import java.sql.Connection

class DbCreator {
    fun createDb() = transaction(Connection.TRANSACTION_SERIALIZABLE, 1) {
        val data = getDummyData()
        SchemaUtils.create(HotelChain, Hotel, HotelChainAddress, HotelChainEmail, Employee, Customer, Room,
             Rental, Booking, Damage)
        val hotelChains = data["hotelChains"] as List<Map<String, Any>>?
        hotelChains?.forEach { raw ->
            HotelChain.insert {
                it[name] = raw["name"] as String
                it[category] = raw["category"] as String
                it[numberOfHotels] = raw["numberOfHotels"].toString().toDouble().toInt()
            }
        }

        val employees = data["employees"] as List<Map<String, Any>>?
        employees?.forEach { raw ->
            Employee.insert {
                it[SIN] = raw["SIN"] as String
                it[name] = raw["name"] as String
                it[hotelID] = raw["hotelID"].toString().toDouble().toInt()
                it[position] = raw["position"] as String
                it[streetAddress] = raw["streetAddress"] as String
                it[city] = raw["city"] as String
                it[province] = raw["province"] as String
                it[postalCode] = raw["postalCode"] as String
            }
        }

        val hotels = data["hotels"] as List<Map<String, Any>>?
        hotels?.forEach { raw ->
            Hotel.insert {
//                it[id] = raw["id"] as Int
                it[hotelChainID] = raw["hotelChainID"].toString().toDouble().toInt()
                it[name] = raw["name"] as String
                it[category] = raw["category"] as String
                it[roomCount] = raw["roomCount"].toString().toDouble().toInt()
                it[email] = raw["email"] as String
                it[managerSIN] = raw["managerSIN"] as String
                it[phoneNumber] = raw["phoneNumber"] as String
                it[streetAddress] = raw["streetAddress"] as String
                it[city] = raw["city"] as String
                it[province] = raw["province"] as String
                it[postalCode] = raw["postalCode"] as String
            }

            for(i in 1..20) {
                Room.insert {
                    val hotelId = raw["id"].toString().toDouble().toInt()
                    it[hotelID] = hotelId
                    it[roomNumber] =  "$i-$hotelId"
                    it[capacity] = 2
                    it[pricePerNight] = 20.0

                }
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

    private fun getDummyData(): Map<String, Any> {
        val data = DbCreator::class.java.getResource("data.json").readText()
        return Gson().fromJson<Map<String, Any>>(data, Map::class.java)
    }
}