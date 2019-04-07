CREATE TRIGGER IF NOT EXISTS hotel_added AFTER INSERT ON Hotel
BEGIN
  UPDATE HotelChain
  SET numberOfHotels = numberOfHotels+1
  WHERE id = NEW.hotelChainID;
end;

/*split*/

CREATE TRIGGER IF NOT EXISTS hotel_removed AFTER DELETE ON Hotel
BEGIN
  UPDATE HotelChain
  SET numberOfHotels = numberOfHotels-1
  WHERE id = NEW.hotelChainID;
end;

/*split*/

CREATE TRIGGER IF NOT EXISTS add_hotel BEFORE INSERT ON Hotel
BEGIN
  SELECT CASE
  WHEN (select count(id) FROM HotelChain WHERE id = NEW.hotelChainID) < 1 THEN
      RAISE(ABORT, "Hotel Chain does not exist")
  end;
end;

/*split*/

CREATE TRIGGER IF NOT EXISTS add_employee BEFORE INSERT ON Employee
BEGIN
  SELECT CASE
  WHEN (select count(id) FROM Hotel WHERE id = NEW.hotelID) < 1 THEN
      RAISE(ABORT, "Hotel does not exist")
  end;
end;

/*split*/

CREATE TRIGGER IF NOT EXISTS add_room BEFORE INSERT ON Room
BEGIN
  SELECT CASE
  WHEN (select count(id) FROM Hotel WHERE id = NEW.hotelID) < 1 THEN
     RAISE(ABORT, "Hotel does not exist")
  end;
end;

/*split*/

CREATE TRIGGER IF NOT EXISTS add_booking BEFORE INSERT ON Booking
BEGIN
  SELECT CASE
  WHEN (select count(roomNumber) FROM Room WHERE roomNumber = NEW.roomNumber) < 1 THEN
    RAISE(ABORT, "Room does not exist")
  end;
  SELECT CASE
  WHEN (select count(id) FROM Hotel WHERE id = NEW.hotelID) < 1 THEN
      RAISE(ABORT, "Hotel does not exist")
  end;
  SELECT CASE
  WHEN (select count(SIN) FROM Customer WHERE SIN = NEW.customerSIN) < 1 THEN
     RAISE(ABORT, "Customer does not exist")
  end;
end;

/*split*/

CREATE TRIGGER IF NOT EXISTS add_Rental BEFORE INSERT ON Rental
BEGIN
  SELECT CASE
           WHEN (select count(roomNumber) FROM Room WHERE roomNumber = NEW.roomNumber) < 1 THEN
             RAISE(ABORT, "Room does not exist")
             end;
  SELECT CASE
           WHEN (select count(id) FROM Hotel WHERE id = NEW.hotelID) < 1 THEN
             RAISE(ABORT, "Hotel does not exist")
             end;
  SELECT CASE
           WHEN (select count(SIN) FROM Customer WHERE SIN = NEW.customerSIN) < 1 THEN
             RAISE(ABORT, "Customer does not exist")
             end;
  SELECT CASE
           WHEN (select count(SIN) FROM Employee WHERE SIN = NEW.employeeSIN) < 1 THEN
             RAISE(ABORT, "Employee does not exist")
             end;
end;