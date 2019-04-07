import React from "react"
import {Link} from "react-router-dom"

function NewOrUpdate(props){

    if(props.new === "true"){
        return(
            <Link to={"/employee"}>
                <input className={"ui primary button"} type={"submit"} tabIndex="0" id={"submit"} value={"Submit"} onClick={()=> props.func(props.service)}/>
            </Link>
        )
    }else {
        return(
            <Link to={"/employee"}>
                <input className={"ui primary button"}  id={"update"} type={"submit"} tabIndex="0" value={"Update"} onClick={()=> props.func(props.service)}/>
            </Link>
        )
    }
}

class RentalBookingForm extends React.Component{
    constructor(props){
        super(props);
        // this.state ={submit:true};
        this.sendData=this.sendData.bind(this);
    }
    sendData(){
        let obj

        const bookingId = document.getElementById("bookingId").value
        const hotelID = document.getElementById("hotelID").value
        const roomNumber = document.getElementById("roomNumber").value
        const startDate = document.getElementById("startDate").value
        const endDate = document.getElementById("endDate").value
        const customerSIN = document.getElementById("customerSIN").value
         obj = "{" +
             "\"bookingId\":\""+bookingId+"\","
            if(this.props.rental){
                const rentalId = document.getElementById("rentalId").value
                obj = obj + "rentalId\":\""+rentalId+"\","
            }
            obj = obj + "\"hotelID\":\""+hotelID+"\","+
            "\"roomNumber\":\""+roomNumber+"\","+
            "\"startDate\":\""+startDate+"\","+
            "\"endDate\":\""+endDate+"\","+
            "\"customerSIN\":\""+customerSIN+"\"}"
        console.log(obj)
        console.log(this.props.service)
        // const xhr = new XMLHttpRequest()
        // xhr.open('POST', '/server', true)
        // xhr.send(obj)
    }
    render(){
        let button;
        let div;
        let div1;
        let roomNumberDiv;
        let hotelIdDiv;
        console.log(this.props);
        //change this from a state based condition to a props based condition
        if(this.props.submit){
            button = <NewOrUpdate new={"true"} func={this.sendData} />
        }else {
            button = <NewOrUpdate  func={this.sendData}/>
        }
        if(this.props.rental){
            div = <div>
                    Rental Id: <input type={"text"} name={"rentalId"} id={"rentalId"}/>
                    <br/>
                </div>
            div1 = <div>
                    Booking Id: <input type={"text"} name={"bookingId"} id={"bookingId"}/>
                    <br/>
                    </div>
            hotelIdDiv =   <div>
                Hotel Id: <input type={"text"} id={"hotelID"}/>
                <br/>
            </div>
            roomNumberDiv = <div>
                Room Number: <input type={"text"} id={"roomNumber"}/><br/>
            </div>
        }

        else {
            if(this.props.location.state.id === undefined){
                roomNumberDiv = <div>
                                    Room Number: <input type={"text"} id={"roomNumber"}/><br/>
                                </div>
                hotelIdDiv =   <div>
                                Hotel Id: <input type={"text"} id={"hotelID"}/>
                                <br/>
                                </div>
            }else {
                roomNumberDiv = <div>
                                    Room Number: <input type={"text"} id={"roomNumber"} value={this.props.location.state.id} readOnly/><br/>
                                 </div>
                hotelIdDiv =   <div>
                                 Hotel Id: <input type={"text"} id={"hotelID"} value={this.props.location.state.hotelId} readOnly/>
                                 <br/>
                                </div>
            }
            div = <div>
                    Booking Id: <input type={"text"} name={"bookingId"} id={"bookingId"}/>
                    <br/>
                </div>
        }
        return (
            <div>
                {/*<form>*/}




                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <form className="ui form">
                        <h4 className="ui dividing header">Rental Booking Information</h4>
                        <div className="field">
                            <div className=" fields">
                                <div className="field">
                                    {div}
                                </div>
                                <div className="field">
                                    {hotelIdDiv}
                                </div>
                                <div className="field">
                                    {roomNumberDiv}
                                </div>
                            </div>

                            <div className="two fields">
                                <div className="field">
                                    <div>
                                        Customer SIN: <input type={"text"} id={"customerSIN"}/>
                                        <br/>
                                    </div>
                                </div>
                                <div className="field">
                                    {div1}
                                </div>
                            </div>
                            <div className="two fields">

                                <div className="field">
                                    <div>
                                        Start Date: <input type={"date"} id={"startDate"}/>
                                        <br/>
                                    </div>
                                </div>
                                <div className="field">
                                    <div>
                                        End Date: <input type={"date"} id={"endDate"}/>
                                        <br/>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div>
                            <span> {button}</span>
                            <span>
                                        <input style={{float:"right"}} className={"ui  button"} type={"submit"} tabIndex="0" id={"Cancel"} value={"Cancel"} />
                                    </span>
                            <br/>
                        </div>
                    </form>
                </div>

                {/*</form>*/}
            </div>
        )
    }
}

export default RentalBookingForm