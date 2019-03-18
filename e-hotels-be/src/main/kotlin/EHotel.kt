import org.jetbrains.exposed.sql.Database
import service.AuthService
import spark.Request
import spark.Spark.*
import java.io.File


fun main(args: Array<String>) {
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
    get("/signIn") { req, res ->
        println("hii")
        val email = req.get<String, String>("email")
        val password = req.get<String, String>("password")
        if (email == null || password == null) {
            return@get Response(error = HotelsError()).toJSON()
        }
        val response = AuthService(req).signIn(email, password)
        response.toJSON()
    }
    get("/signUp") { req, res ->
        val map = req.map<String, String>()
        val response = AuthService(req).signUp(map)
        response.toJSON()
    }
    get("/currentUser") { req, res ->
        val email = req.session().attribute<String>("user")
            ?: return@get Response(error = HotelsError("No one is signed in")).toJSON()
        val user = AuthService(req).getCustomer(email)
        return@get Response(user.toJSON()).toJSON()
    }
    get("/signOut") { req, res ->
        req.session().invalidate()
        Response("User has been successfully signed out").toJSON()
    }
}

fun getReqMap(req: Request): Map<String, Any> {
    return req.queryMap().toMap()
}
