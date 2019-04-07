import React from "react"

function UpdatePage() {
    return(
        <div>
            <h3>Update Page</h3>
            <div className="ui three item menu">
                <a className="item" href={"/"}>Home</a>
                <a className="item" href={"/updateRoom"}>Update Room</a>
                <a className="item" href={"/updateHotel"}>Update Hotel</a>
            </div>
            <div className="ui two item menu">
                <a className="item" href={"/updateCustomer"}>Update Customer</a>
                <a className="item" href={"/updateEmployee"}>Update Employee</a>
            </div>
        </div>
    )
}

export default UpdatePage