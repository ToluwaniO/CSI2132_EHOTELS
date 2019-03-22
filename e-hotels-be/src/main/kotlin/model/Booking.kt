package model

data class Booking(var id: Int, var hotelID: Int, var roomNumber: String, var startTime: Long, var endTime: Long,
                   var customerSIN: String)