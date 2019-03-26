import React from "react"
import {Link} from "react-router-dom";

class EmployeePage extends React.Component{
    render() {
        return(
            <div>
                <Link to={"/"}>
                    <button>Home</button>
                </Link>
                <div>
                  Add new Customer:
                    <Link to={"/addCustomer"}>
                        <button>Add Customer</button>
                    </Link>
                </div>
                <div>
                    Add new Employee:
                    <Link to={"/addEmployee"}>
                        <button>Add Employee</button>
                    </Link>

                </div>
                <div>
                    Add new Hotel:
                    <Link to={"/addHotel"}>
                        <button>Add Hotel</button>
                    </Link>

                </div>
                <div>
                    Add new Room:
                    <Link to={"/addRoom"}>
                        <button>Add Room</button>
                    </Link>
                </div>
                <div>
                    Create Rental:
                    <Link to={"/newRental"}>
                        <button> Rental</button>
                    </Link>

                </div>
                <div>
                    Find Booking:
                    <Link to={"/findBooking"}>
                        <button> Booking</button>
                    </Link>

                </div>
                <div>
                    Update Data:
                    <Link to={"/updateData"}>
                        <button> Update Data</button>
                    </Link>
                </div>
                <div>
                    Delete Data:
                    <Link to={"/deleteData"}>
                        <button> Delete Data</button>
                    </Link>

                </div>

            </div>
        )
    }
}

export default EmployeePage