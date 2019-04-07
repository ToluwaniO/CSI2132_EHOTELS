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
                <form className="ui form">
                    <h4 className="ui dividing header">Room Information</h4>
                    <div className="field">
                        <div className="two fields">

                            <div className="field">
                                <div>
                                    Room Number: <input type={"text"} name={"roomNumber"} id={"roomNumber"}/>
                                    <input type={"submit"} value={"Delete Room"} onClick={() => {console.log("hello")}}/>
                                    <br/>
                                </div>
                            </div>
                            <div className="field">
                                <div>
                                    Hotel Id: <input type={"text"} id={"hotelId"}/>
                                    <input type={"submit"} value={"Delete Hotel"} onClick={() => {console.log("hello")}}/>
                                    <br/>
                                </div>
                            </div>
                        </div>
                        <div className="two fields">
                            <div className="field">
                                <div>
                                    Customer SIN: <input type={"text"} id={"customerSIN"}/>
                                    <input type={"submit"} value={"Delete Customer"} onClick={() => {console.log("hello")}}/>
                                    <br/>
                                </div>
                            </div>
                            <div className="field">
                                <div>
                                    Employee SIN: <input type={"text"} id={"employeeSIN"}/>
                                    <input type={"submit"} value={"Delete Employee"} onClick={() => {console.log("hello")}}/>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    delete(service) {

    }
}

export default DeletePage