package service

import HotelsError
import Response
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.joda.time.DateTime
import spark.Request
import toJSON
import toMap
import validateMap
import java.sql.Connection

class AuthService(val req: Request) {
    fun signIn(email: String, password: String): Response? {
        val sessionUser = req.session().attribute<String>("user")
        if (sessionUser == email) {
            return Response("User is already signed in")
        } else if (sessionUser != null) {
            req.session().invalidate()
        }
        val resp =transaction(Connection.TRANSACTION_SERIALIZABLE, 0) {
            val customers = Customer.select {
                Customer.email eq email
            }.toList()
            println(customers)
            if (customers.isEmpty()) {
                return@transaction Response(error = HotelsError("This email does not exist"))
            }
            val user = customers[0]
            if (user[Customer.password] != password) {
                return@transaction Response(error = HotelsError("Password incorrect"))
            }
            req.session().attribute("user", user[Customer.email])
            return@transaction Response(
                data = getCustomer(email).toJSON()
            )
        }
        return resp
    }

    fun signUp(data: Map<String, String>): Response {
        if (!Customer.validateMap(data)) {
            return Response(error = HotelsError("Invalid data"))
        }
        val resp = transaction(Connection.TRANSACTION_SERIALIZABLE, 0) {
            addLogger(StdOutSqlLogger)
            val prevUser = getCustomer(data["email"]!!)
            if (prevUser != null) {
                return@transaction Response(error = HotelsError("This user already exists"))
            }
            val email = Customer.insert {
                it[SIN] = "${System.currentTimeMillis()}".substring(0,9)
                it[email] = data["email"] ?: throw Exception("")
                it[password] = data["password"] ?: throw Exception("")
                it[name] = data["name"] ?: throw Exception("")
                it[registrationDate] = DateTime.now()
                it[streetAddress] = data["streetAddress"] ?: throw Exception("")
                it[city] = data["city"] ?: throw Exception("")
                it[province] = data["province"] ?: throw Exception("")
                it[postalCode] = data["postalCode"] ?: throw Exception("")
            }
            val user = getCustomer(data["email"]!!) ?: return@transaction Response(error = HotelsError())
            req.session().attribute("user", user["email"])
            return@transaction Response(user.toJSON())
        }
        return resp
    }

    fun getCustomer(email: String, showPassword: Boolean = false): Map<String, Any?>? {
        val resp = transaction(Connection.TRANSACTION_SERIALIZABLE, 0) {
            val slice = arrayListOf(Customer.SIN, Customer.name, Customer.email, Customer.streetAddress, Customer.city,
                Customer.province, Customer.postalCode)
            if (showPassword) {
                slice.add(Customer.password)
            }
            val users = Customer.slice(slice).select {
                Customer.email eq email
            }.toList()
            if (users.isEmpty()) {
                return@transaction null
            }
            return@transaction users[0].toMap("Customer")
        }
        return resp
    }
}