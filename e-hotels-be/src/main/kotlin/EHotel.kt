import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.name
import service.AuthService
import service.EmployeeService
import service.HotelService
import spark.Request
import spark.Spark.*
import java.io.File
import java.sql.Connection
import java.sql.DriverManager


fun main() {
    val cwd = System.getProperty("user.dir");
    val dbPath = "$cwd\\src\\main\\kotlin\\EHotels.db"
    val dbFile = File(dbPath)
    if(dbFile.exists()) {
        println("File exists")
        dbFile.delete()
    }
    val db = Database.connect("jdbc:sqlite:$dbPath", driver = "org.sqlite.JDBC", user = "root", password = "password")
    val connection = connection()
    println("DB file in $dbPath")
    DbCreator().createDb(db.connector())
    CorsFilter().apply()
    get("/hello") { req, res ->
        "Hello world!"
    }
    post("/signIn") { req, res ->
        val email = req.get<String, String>("email")
        val password = req.get<String, String>("password")
        if (email == null || password == null) {
            return@post Response(error = HotelsError()).toJSON()
        }
        val response = AuthService(req).signIn(email, password)
        response.toJSON()
    }
    post("/signUp") { req, res ->
        val map = req.map<String, String>()
        val response = AuthService(req).signUp(map)
        response.toJSON()
    }
    get("/currentUser") { req, res ->
        val email = req.session().attribute<String>("user")
            ?: return@get Response(error = HotelsError("No one is signed in")).toJSON()
        val user = AuthService(req).getCustomer(email)
        return@get Response(user).toJSON()
    }
    post("/signOut") { req, res ->
        req.session().invalidate()
        Response("User has been successfully signed out").toJSON()
    }
    get("/hotels") { req, res ->
        HotelService(req).getHotels().toJSON()
    }
    get("/hotel/:id") { req, res ->
        val id = req.params("id").toIntOrNull()
        if (id == null) {
            return@get Response(error = HotelsError("Hotel id is invalid or does not exist")).toJSON()
        }
        HotelService(req).getHotelById(id).toJSON()
    }
    get("/rooms/:hotelId") { req, res ->
        val id = req.params("hotelId").toIntOrNull()
        if (id == null) {
            return@get Response(error = HotelsError("Hotel id is invalid or does not exist")).toJSON()
        }
        HotelService(req).getRoomsByHotel(id).toJSON()
    }
    post("/bookRoom") { req, res ->
        val data = req.map<String, Any?>()
        if (data.isEmpty()) {
            return@post Response(error = HotelsError("Invalid request body")).toJSON()
        }
        HotelService(req).bookRoom(req.body().to()).toJSON()
    }

    post("/bookingToRental") { req, res ->
        val data = req.map<String, String>()
        if (data.isEmpty()) {
            return@post Response(error = HotelsError("Invalid request body")).toJSON()
        }
        HotelService(req).bookingToRental(data).toJSON()
    }

    get("/rooms") { req, res ->
        val data = req.map<String, String>()
        HotelService(req).availableRoomsInCriteria(data).toJSON()
    }

    post("/addHotel") { req, res ->
        val data = req.body().to<model.Hotel>()
        if (data.id > 0) {
            HotelService(req).addHotel(data, true).toJSON()
        }
        HotelService(req).addHotel(data).toJSON()
    }

    post("/addHotelChain") { req, res ->
        val data = req.body().to<model.HotelChain>()
        HotelService(req).addHotelChain(data).toJSON()
    }

    post("/addRoom") { req, res ->
        val data = req.body().to<model.Room>()
        HotelService(req).addRoom(data).toJSON()
    }

    get("/search") { req, res ->
        val data = req.reqParams()
        val rooms = HotelService(req).search(
            data["name"] as String?,
            data["hotelChainID"]?.toIntOrNull(),
            data["startTime"]?.toLongOrNull(),
            data["endTime"]?.toLongOrNull(),
            data["city"],
            data["province"],
            data["category"]?.toIntOrNull()
        )
        Response(rooms).toJSON()
    }

    post("/deleteHotel/:id") { req, res ->
        val id = req.params("id").toIntOrNull()
        if (id == null) {
            return@post Response(error = HotelsError("Could not find hotel id in url (/deleteHotel/:id)")).toJSON()
        }
        HotelService(req).deleteHotel(id).toJSON()
    }

    post("/addEmployee") { req, res ->
        val data = req.body().to<model.Employee>()
        EmployeeService(req).addEmployee(data).toJSON()
    }

    post("/deleteEmployee/:SIN") { req, res ->
        val sin = req.params("SIN").toString()
        if (sin == null) {
            return@post Response(error = HotelsError("Could not find Employee SIN in url (/deleteEmployee/:SIN)")).toJSON()
        }
        EmployeeService(req).deleteEmployee(sin) ?: Response(error = HotelsError())
    }

    post("/deleteRoom/:id") { req, res ->
        val id = req.params("id").toString()
        if (id == null || !id.contains("-")) {
            return@post Response(error = HotelsError("Could not find Room")).toJSON()
        }
        val keys = id.split("-")
        HotelService(req).deleteRoom(keys[0].toInt(), keys[1]).toJSON()
    }

    post("/deleteCustomer/:sin") { req, res ->
        val sin = req.params("sin").toString()
        if (sin == null || sin.isBlank()) {
            return@post Response(error = HotelsError("Could not find customer")).toJSON()
        }
        AuthService(req).deleteCustomer(sin).toJSON()
    }

    get("/findBooking") { req, res ->
        val query = req.reqParams()
        HotelService(req).findBooking(
            query["customerSIN"],
            query["bookingID"]?.toIntOrNull()
        ).toJSON()
    }
}


fun connection(): Connection {
    val cwd = System.getProperty("user.dir");
    val dbPath = "$cwd\\src\\main\\kotlin\\EHotels.db"
    val url = "jdbc:sqlite:$dbPath"
    Class.forName("org.sqlite.JDBC")
    return DriverManager.getConnection(url, "root", "password");
}
