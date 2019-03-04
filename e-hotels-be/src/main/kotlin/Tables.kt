import org.jetbrains.exposed.sql.Table

object HotelChain: Table() {
    val id = integer("id").autoIncrement().primaryKey()
    val name = varchar("name", 100)
    val category = varchar("category", 100)
    val numberOfHotels = integer("numberOfHotels")
}

object Hotel: Table() {
    val id = integer("id").autoIncrement().primaryKey()
    val hotelChainID = integer("hotelChainID") references HotelChain.id
    val name = varchar("name", 100)
    val category = varchar("category", 100)
    val roomCount = integer("roomCount")
    val email = varchar("email", 100)
    val managerSIN = varchar("managerSIN", 9) references Employee.SIN
    val phoneNumber = varchar("phoneNumber", 11)
    val streetAddress = varchar("streetAddress", 100)
    val city = varchar("city", 20)
    val province = varchar("province", 20)
    val postalCode = varchar("postalCode", 6)
}

object Employee: Table() {
    val SIN = varchar("SIN", 9).primaryKey()
    val name = varchar("name", 100)
    val hotelID = integer("hotelId") references Hotel.id
    val position = varchar("position", 100)
    val streetAddress = varchar("streetAddress", 100)
    val city = varchar("city", 20)
    val province = varchar("province", 20)
    val postalCode = varchar("postalCode", 6)
}

object Room: Table() {
    val hotelID = integer("hotelID") references Hotel.id
    val roomNumber = varchar("roomNumber", 10)
    val capacity = integer("capacity")
    val pricePerNight = double("pricePerNight")
}

object Customer: Table() {
    val SIN = varchar("SIN", 9).primaryKey()
    val name = varchar("name", 100)
    val registrationDate = date("registrationDate")
    val streetAddress = varchar("streetAddress", 100)
    val city = varchar("city", 20)
    val province = varchar("province", 20)
    val postalCode = varchar("postalCode", 6)
}

object Booking: Table() {
    val id = integer("id").autoIncrement().primaryKey()
    val hotelID = integer("hotelID") references Hotel.id
    val roomNumber = varchar("roomNumber", 10)
    val startTime = datetime("startTime")
    val endTime = datetime("endTime")
    val customerSIN = varchar("customerSIN", 9) references Customer.SIN
}

object Rental: Table() {
    val id = integer("id").autoIncrement().primaryKey()
    val hotelName = varchar("hotelName", 100)
    val hotelAddress = varchar("hotelAddress", 100)
    val roomNumber = varchar("roomNumber", 10)
    val startTime = datetime("startTime")
    val endTime = datetime("endTime")
    val employeeSIN = varchar("employeeSIN", 9) references Employee.SIN
    val bookingID = (integer("bookingID") references Booking.id).nullable()
}

object Damage: Table() {
    val id = integer("id").autoIncrement().primaryKey()
    val hotelID = integer("hotelID") references Hotel.id
    val roomNumber = varchar("roomNumber", 10)
    val damageDescription = text("damageDescription")
}

object HotelChainAddress: Table() {
    val id = integer("id").autoIncrement().primaryKey()
    val hotelChainID = integer("hotelChainID") references HotelChain.id
    val streetAddress = varchar("streetAddress", 20)
    val city = varchar("city", 20)
    val province = varchar("province", 20)
    val postalCode = varchar("postalCode", 6)
}

object HotelChainEmail: Table() {
    val id = integer("id").autoIncrement().primaryKey()
    val hotelChainID = integer("hotelChainID") references HotelChain.id
    val email = varchar("email", 50)
}

object HotelChainPhoneNumber: Table() {
    val id = integer("id").autoIncrement().primaryKey()
    val hotelChainID = integer("hotelChainID") references HotelChain.id
    val phoneNumber = varchar("phoneNumber", 11)
}