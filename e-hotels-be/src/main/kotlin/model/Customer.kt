package model

data class Customer(var SIN: String, var email: String, var password: String, var name: String,
                    var registrationDate: Long, var streetAddress: String, var city: String, var province: String,
                    var postalCode: String)