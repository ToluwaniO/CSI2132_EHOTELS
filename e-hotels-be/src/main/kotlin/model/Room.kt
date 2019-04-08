package model

data class Room(var hotelID: Int, var hotelName: String? = null, var roomNumber: String, var capacity: Int, var pricePerNight: Double)