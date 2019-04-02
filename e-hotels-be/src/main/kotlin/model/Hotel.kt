package model

data class Hotel(var id: Int, var hotelChainID: Int, var name: String, var category: String, var roomCount: Int,
                 var email: String, var managerSIN: String, var phoneNumber: String, var streetAddress: String,
                 var city: String, var province: String, var postalCode: String)