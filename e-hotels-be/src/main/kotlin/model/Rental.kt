package model

data class Rental(var id: Int, var hotelID: Int, var roomNumber: String, var startTime: Long, var endTime: Long,
                   var customerSIN: String, var employeeSIN: String, var bookingID: Int?)