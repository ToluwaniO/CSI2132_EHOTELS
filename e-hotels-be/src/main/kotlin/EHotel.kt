import org.jetbrains.exposed.sql.Database
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
}
