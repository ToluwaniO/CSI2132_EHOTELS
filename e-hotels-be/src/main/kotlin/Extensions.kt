import adapter.DateTimeAdapter
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.joda.time.DateTime
import spark.QueryParamsMap
import spark.Request
import java.sql.Connection


fun <K, V> Request.get(key: K, mapName: String? = null): V? {
    return map<K, V>()[key]
}

fun <K, V> Request.map(): Map<K, V> {
    if (body().isBlank()) {
        return mapOf()
    }
    return body().toMap()
}


fun <T> T.toJSON(): String {
    return Gson().toJson(this)
}

inline fun <reified T> ResultRow.to(tableNames: List<Table>): T {
    return Gson().fromJson<T>(toJSON(tableNames), T::class.java)
}

inline fun <reified T> String.to(): T {
    return Gson().fromJson<T>(this, T::class.java)
}

fun ResultRow.toMap(tableNames: List<Table>): Map<String, Any?> {
    val map = HashMap<String, Any?>()
    for (table in tableNames) {
        val columns = table.columns
        for (column in columns) {
            if (table == tableNames[0]) {
                map[column.name] = this.tryGet(column)
            } else {
                map["${table.tableName}_${column.name}"] = this.tryGet(column)
            }
        }
    }
    return map
}

fun ResultRow.toJSON(tableNames: List<Table>): String {
    val map = toMap(tableNames)
    val gson = GsonBuilder()
        .registerTypeAdapter(DateTime::class.java, DateTimeAdapter())
        .create()
    return gson.toJson(map)
}

fun getTable(name: String): Table {
    return when (name) {
        "Customer" -> Customer
        "Booking" -> Room
        "HotelChain" -> HotelChain
        "Rental" -> Rental
        else -> Hotel
    }
}

fun Request.queryStringMap(): Map<String, Any> {
    val qMap = queryMap().toMap()
    val nMap = hashMapOf<String, String>()
    for (entry in qMap.entries) {
        nMap[entry.key] = entry.value?.joinToString("") ?: ""
    }
    return nMap
}

fun Table.validateMap(map: Map<String, Any>): Boolean {
    for (column in this.columns) {
//        if (!column.columnType.nullable && map[column.name] == null) return false
    }
    return true
}

fun <K, V> String.toMap(): Map<K, V> {
    return Gson().fromJson<Map<K, V>>(this, Map::class.java)
}

fun Query.toArrayList(): ArrayList<ResultRow> {
    val list = arrayListOf<ResultRow>()
    this.forEach {
        list.add(it)
    }
    return list
}

fun <T> query(retries: Int = 0, statement: () -> T): T? {
    return transaction(Connection.TRANSACTION_SERIALIZABLE, retries) {
        addLogger(StdOutSqlLogger)
        try {
            statement()
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}

fun getStringWithTrailingZeros(number: Int, len: Int): String {
    val n = "$number"
    var SIN = n
    for (i in 0 until (len-n.length)) {
        SIN = "0$SIN"
    }
    return SIN
}
fun <T> Request.param(key: String): T? {
    val param = queryParams(key)
    if (param == null || param.isBlank()) {
        return null
    }
    return param.split("?")[0] as T?
}

fun Request.reqParams(): Map<String, String?> {
    val query = queryString() ?: ""
    println(query)
    val map = hashMapOf<String, String?>()
    val entries = query.split("?")
    for (entry in entries) {
        val keyValue = entry.split("=")
        if (keyValue.size == 2) {
            map[keyValue[0]] = keyValue[1]
        }
    }
    return map
}