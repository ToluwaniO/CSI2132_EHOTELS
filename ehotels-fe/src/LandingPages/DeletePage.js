import React from "react"
import {Link} from "react-router-dom";

class DeletePage extends React.Component{
    render() {
        let hotelButton
        let roomButton
        let customerButton
        let employeeButton
        if(this.props.delete === true){
            hotelButton = <input id={"hotelID"} type={"submit"} value={"Delete Hotel"}/>
            roomButton = <input id={"roomID"} type={"submit"} value={"Delete Room"}/>
            customerButton = <input id={"customerSIN"} type={"submit"} value={"Delete Customer"}/>
            employeeButton = <input id={"employeeSIN"} type={"submit"} value={"Delete Employee"}/>
        }else{
            hotelButton = <Link to={"/updateHotel"}>
                             <input type={"submit"} value={"Update Hotel"}/>
                            </Link>
            roomButton = <Link to={"/updateRoom"}>
                            <input type={"submit"} value={"Update Room"}/>
                        </Link>
            customerButton = <Link to={"/updateCustomer"}>
                                <input type={"submit"} value={"Update Customer"}/>
                            </Link>
            employeeButton = <Link to={"/updateEmployee"}>
                                <input type={"submit"} value={"Update Employee"}/>
                            </Link>
        }

        return(
            <div>
                <div>
                    Room Id: <input type={"text"} id={"roomId"}/><br/>
                    {roomButton}
                </div>
                <div>
                    Hotel Id: <input type={"text"} id={"hotelId"}/><br/>
                    {hotelButton}
                </div>
                <div>
                    Customer SIN: <input type={"text"} id={"customerSIN"}/><br/>
                    {customerButton}
                </div>
                <div>
                    Employee SIN: <input type={"text"} id={"employeeSIN"}/><br/>
                    {employeeButton}
                </div>

            </div>
        )
    }

    delete(service) {

    }
}

export default DeletePage