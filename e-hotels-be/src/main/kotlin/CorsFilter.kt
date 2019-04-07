
import spark.Spark
import jdk.nashorn.internal.objects.NativeArray.forEach
import spark.Filter
import spark.Request
import java.util.HashMap

class CorsFilter {
    private val corsHeaders = HashMap<String, String>()

    init {
        corsHeaders["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,OPTIONS";
        corsHeaders["Access-Control-Allow-Origin"] = "*";
        corsHeaders["Access-Control-Allow-Headers"] =
            "Content-Type,Authorization,X-Requested-With,Content-Length,Accept,Origin,";
        corsHeaders["Access-Control-Allow-Credentials"] = "true";
    }

    fun apply() {
        val filter = Filter { request, response -> corsHeaders.forEach { key, value -> response?.header(key, value) } }
        Spark.after(filter)
    }
}