import React from "react"

class EmployeePage extends React.Component{
    render() {
        return(
            <div>
                <div className="ui three item menu">

                    <a className="item" href={"/"}>Home</a>

                    {/*<h3> OR </h3>*/}
                    <a className="item" href={"/addCustomer"}>Add Customer</a>

                    <a className="item" href={"/addEmployee"}>Add Employee</a>

                </div>
                <div className="ui three item menu">

                    <a className="item" href={"/addHotel"}>Add Hotel</a>

                    {/*<h3> OR </h3>*/}
                    <a className="item" href={"/addRoom"}>Add Room</a>

                    <a className="item" href={"/newRental"}>New Rental</a>

                </div>
                <div className="ui three item menu">

                    <a className="item" href={"/findBooking"}>Find Booking</a>

                    {/*<h3> OR </h3>*/}
                    <a className="item" href={"/updateData"}>Update Data</a>

                    <a className="item" href={"/deleteData"}>Delete Data</a>

                </div>

            </div>
        )
    }
}

export default EmployeePage