package service

import spark.Request
import Response
import HotelsError
import org.jetbrains.exposed.sql.transactions.transaction
import toJSON
import java.sql.Connection
import HotelChain
import Room
import Hotel
import Booking
import Rental
import org.jetbrains.exposed.sql.*
import org.joda.time.DateTime
import query
import to

class HotelService(val req: Request) {
    fun getHotels(): Response {
        val hotels = query {
            val hotels = arrayListOf<model.Hotel>()
            val rows = Hotel.join(HotelChain, JoinType.INNER, additionalConstraint = {HotelChain.id eq Hotel.hotelChainID})
                .selectAll()
            for (row in rows) {
                hotels.add(row.to(listOf(Hotel, HotelChain)))
            }
            hotels
        }
        return Response(hotels)
    }

    fun getHotelById(id: Int): Response {
        val hotel = query {
            val query = Hotel.join(HotelChain, JoinType.INNER,
                additionalConstraint = {HotelChain.id eq Hotel.hotelChainID}).select {
                    Hotel.id eq id
                }.fetchSize(1)
            val hotels = query.toList()
            if (hotels.isEmpty()) {
                return@query null
            }
            hotels[0].to<model.Hotel>(listOf(Hotel, HotelChain))
        }
        if (hotel == null) {
            return Response(error = HotelsError("There is no hotel with id $id"))
        }
        return Response(hotel)
    }

    fun getRoomsByHotel(id: Int): Response {
        val rooms = query {
            val hotelQuery = Hotel.select { Hotel.id eq id }
            if (hotelQuery.count() == 0) {
                println("This hotel does not exist")
                return@query null
            }
            val query = Room.select { Room.hotelID eq id }
            val rooms = arrayListOf<model.Room>()
            query.toList().forEach {
                rooms.add(it.to(listOf(Room)))
            }
            rooms
        }
        if (rooms == null) {
            return Response(error = HotelsError("An error occurred"))
        }
        return Response(rooms)
    }

    fun bookRoom(map: model.Booking): Response {
        if (!AuthService(req).isSignedIn(map.customerSIN)) {
            return Response(error = HotelsError("This user is not signed in"))
        }
        val availableRooms = roomsAvailable(map.hotelID, map.startTime, map.endTime).toHashSet()
        val room = query {
            val rooms =  Room.select {
                Room.hotelID eq map.hotelID
            }.andWhere {
                Room.roomNumber eq map.roomNumber
            }.map {
                it.to<model.Room>(listOf(Room))
            }.toList()
            if (rooms.isEmpty()) {
                return@query null
            }
            rooms[0]
        }
        if(room == null || !availableRooms.contains(room)) {
            return Response(error = HotelsError("This room is not available in this time range"))
        }
        val booking = query {
            val query = Booking.insert {
                it[hotelID] = map.hotelID
                it[roomNumber] = map.roomNumber
                it[startTime] = DateTime(map.startTime)
                it[endTime] = DateTime(map.endTime)
                it[customerSIN] = map.customerSIN
            }
            query.resultedValues?.forEach {
                println(it.toJSON(listOf(Booking)))
            }
            val bking = Booking.select {
                Booking.hotelID eq map.hotelID
            }.andWhere {
                Booking.customerSIN eq map.customerSIN
            }.andWhere {
                Booking.startTime eq DateTime(map.startTime)
            }
            if (bking.count() == 0) {
                null
            } else {
                bking.toList()[0].to<model.Booking>(listOf(Booking))
            }
        }
        if (booking == null) {
            return Response(error = HotelsError("Failed to create booking"))
        }
        return Response(booking)
    }

    fun bookingToRental(map: Map<String, Any>): Response {
        val s = query {
            val bookingQuery = Booking.select {
                Booking.id eq map["bookingID"].toString().toDouble().toInt()
            }.toList()
            if (bookingQuery.isEmpty()) {
                return@query Response(error=HotelsError("This booking does not exist"))
            }
            val booking = bookingQuery[0].to<model.Booking>(listOf(Booking))
            val insertOperation = Rental.insert {
                it[Rental.bookingID] = booking.id
                it[Rental.customerSIN] = map["customerSIN"] as String
                it[Rental.employeeSIN] = map["employeeSIN"] as String
                it[Rental.startTime] = DateTime(booking.startTime)
                it[Rental.endTime] = DateTime(booking.endTime)
                it[Rental.hotelID] = booking.hotelID
                it[Rental.roomNumber] = booking.roomNumber
            }
            val result = insertOperation.resultedValues
            if (result == null || result.isEmpty()) {
                return@query Response(error = HotelsError("An error occurred, could not create rental."))
            }
            val fakeBooking = result[0].to<model.Rental>(listOf(Rental))
            val rentalQuery = Rental.select {
                Rental.id eq fakeBooking.id
            }.toList()
            if (rentalQuery.isEmpty()) {
                Response(error = HotelsError("An error occurred, could not create rental."))
            }
            Response(rentalQuery[0].to<model.Rental>(listOf(Rental)))
        }
        if (s == null) {
            return Response(error = HotelsError("An error occurred"))
        }
        return s
    }

    fun availableRoomsInCriteria(map: Map<String, Any?>): Response {
        val rooms = roomsAvailable(
            map["hotelID"]?.toString()?.toDouble()?.toInt(),
            map["startTime"]?.toString()?.toDouble()?.toLong(),
            map["endTime"]?.toString()?.toDouble()?.toLong()
        )
        return Response(rooms)
    }

    fun roomsAvailable(hotelID: Int?, startTime: Long?, endTime: Long?): List<model.Room> {
        val rooms = query {
            val q = Booking.selectAll()
            hotelID?.let {
                q.andWhere {
                    Booking.hotelID eq it
                }
            }
            startTime?.let {
                q.andWhere {
                    Booking.startTime greaterEq DateTime(it)
                }
            }
            endTime?.let {
                q.andWhere {
                    Booking.endTime lessEq DateTime(it)
                }
            }
            val rows = q.toList()
            val bookings = hashSetOf<Pair<Int, String>>()
            rows.forEach {
                val book = it.to<model.Booking>(listOf(Booking))
                bookings.add(book.hotelID to book.roomNumber)
            }

            val r = Room.selectAll()
            hotelID?.let {
                r.andWhere {
                    Room.hotelID eq it
                }
            }
            r.toList()
            .filter {
                val room = it.to<model.Room>(listOf(Room))
                !bookings.contains(room.hotelID to room.roomNumber)
            }.map {
                it.to<model.Room>(listOf(Room))
            }.toList()
        }
        return rooms ?: emptyList()
    }

    fun addHotel(hotel: model.Hotel): Response {
        val h = query<model.Hotel?> {
            val rows = Hotel.insert {
                it[hotelChainID] = hotel.hotelChainID
                it[name] = hotel.name
                it[category] = hotel.category
                it[roomCount] = hotel.roomCount
                it[email] = hotel.email
                it[managerSIN] = hotel.managerSIN
                it[phoneNumber] = hotel.phoneNumber
                it[streetAddress] = hotel.streetAddress
                it[city] = hotel.city
                it[province] = hotel.province
                it[postalCode] = hotel.postalCode
            }
            val results = rows.resultedValues ?: emptyList()
            if (results.isEmpty()) {
                return@query null
            }
            return@query results[0].to(listOf(Hotel))
        }
        if (h == null) {
            return Response(error=HotelsError("Could not add hotel"))
        }
        return Response(h)
    }

    fun addHotelChain(hotel: model.HotelChain): Response {
        val h = query<model.Hotel?> {
            val rows = HotelChain.insert {
                it[name] = hotel.name
                it[category] = hotel.category
                it[numberOfHotels] = hotel.numberOfHotels
            }
            val results = rows.resultedValues ?: emptyList()
            if (results.isEmpty()) {
                return@query null
            }
            return@query results[0].to(listOf(HotelChain))
        }
        if (h == null) {
            return Response(error=HotelsError("Could not add hotel"))
        }
        return Response(h)
    }

    fun addRoom(room: model.Room): Response {
        val h = query<model.Hotel?> {
            val rows = Room.insert {
                it[hotelID] = room.hotelID
                it[roomNumber] = room.roomNumber
                it[capacity] = room.capacity
                it[pricePerNight] = room.pricePerNight
            }
            val results = rows.resultedValues ?: emptyList()
            if (results.isEmpty()) {
                return@query null
            }
            return@query results[0].to(listOf(Room))
        }
        if (h == null) {
            return Response(error=HotelsError("Could not add hotel"))
        }
        return Response(h)
    }
}