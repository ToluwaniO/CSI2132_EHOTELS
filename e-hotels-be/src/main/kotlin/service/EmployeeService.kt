package service

import spark.Request
import Response
import Employee
import org.jetbrains.exposed.sql.insert
import query
import HotelsError
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.select

class EmployeeService(val req: Request) {
    fun addEmployee(employee: model.Employee): Response {
        val emp = query<model.Employee?> {
            val query = Employee.insert {
                it[SIN] = employee.SIN
                it[name] = employee.name
                it[hotelID] = employee.hotelID
                it[streetAddress] = employee.streetAddress
                it[position] = employee.position
                it[city] = employee.city
                it[province] = employee.province
                it[postalCode] = employee.postalCode
            }
            val resultRows = query.resultedValues ?: emptyList()
            if (resultRows.isEmpty()) {
                return@query null
            }
            return@query employee
        }
        if (emp == null) {
            return Response(error = HotelsError())
        }
        return Response(emp)
    }

    fun deleteEmployee(SIN: String): Response? {
        return query<Response?> {
            Employee.deleteWhere {
                Employee.SIN eq SIN
            }
            val count = Employee.select {
                Employee.SIN eq SIN
            }.count()
            if (count == 0) {
                return@query Response("Employee successfully deleted")
            }
            return@query Response(error=HotelsError("Could not delete Employee"))
        }
    }
}