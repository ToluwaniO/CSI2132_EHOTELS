import org.jetbrains.exposed.sql.Database
import service.AuthService
import service.HotelService
import spark.Request
import spark.Spark.*
import java.io.File


fun main() {
    val cwd = System.getProperty("user.dir");
    val dbPath = "$cwd\\src\\main\\kotlin\\EHotels.db"
    val dbFile = File(dbPath)
    if(dbFile.exists()) {
        println("File exists")
        dbFile.delete()
    }
    Database.connect("jdbc:sqlite:$dbPath", driver = "org.sqlite.JDBC", user = "root", password = "password")
    println("DB file in $dbPath")
    DbCreator().createDb()
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
}
