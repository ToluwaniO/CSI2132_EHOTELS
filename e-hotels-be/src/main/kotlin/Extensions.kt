import com.google.gson.Gson
import org.jetbrains.exposed.sql.Query
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.Table
import spark.Request

//fun Customer.toMap() = mapOf<String, Any>(
//    "SIN" to SIN.name,
//    "email" to email.name,
//    "name" to name.name,
//    "registrationDate" to registrationDate.name,
//    "email" to email.name,
//    "email" to email.name,
//    "email" to email.name,
//    "email" to email.name,
//)

fun <K, V> Request.get(key: K, mapName: String? = null): V? {
    return map<K, V>()[key]
}

fun <K, V> Request.map(): Map<K, V> {
    return body().toMap()
}


fun <T> T.toJSON(): String {
    return Gson().toJson(this)
}

fun ResultRow.toMap(tableName: String): Map<String, Any?> {
    val table = getTable(tableName)
    val columns = table.columns
    val map = HashMap<String, Any?>()
    for (column in columns) {
        map[column.name] = this.tryGet(column)
    }
    return map
}

fun ResultRow.toJSON(tableName: String): String {
    val map = toMap(tableName)
    return Gson().toJson(map)
}

fun getTable(name: String): Table {
    return when (name) {
        "Customer" -> Customer
        else -> Hotel
    }
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