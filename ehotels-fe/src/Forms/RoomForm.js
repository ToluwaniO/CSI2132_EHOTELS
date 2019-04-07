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

class RoomForm extends React.Component{
    constructor(props){
        super(props);
        this.sendData=this.sendData.bind(this);
    }

    sendData(service){
        const hotelId = document.getElementById("hotelId").value
        const roomNumber = document.getElementById("roomNumber").value
        const capacity = document.getElementById("capacity").value
        const pricePerNight = document.getElementById("pricePerNight").value;
        const data = {};
        data.hotelID = hotelId;
        data.roomNumber = roomNumber;
        data.capacity = capacity;
        data.pricePerNight = pricePerNight;
        console.log(data);
        fetch('http://localhost:4567/addRoom', {
            method: "POST",
            body: JSON.stringify(data)
        })
        .then((response) => {
            return response.text()
        }, (error) => {
            console.error(error)
            alert("An error occurred")
        })
        .then((data) => {
            const info = JSON.parse(data)
            if (info.err) {
                alert("an error occurred")
            } else {
                alert("Process successful")
            }
            console.log(data)
        });
    }
    render() {
        let button;
        //change this from a state based condition to a props based condition
        console.log(this.props)
        if (this.props.submit) {
            button = <NewOrUpdate new={"true"} func={this.sendData} service={"/notYetImplemented"}/>
        } else {
            button = <NewOrUpdate func={this.sendData} service={"/notYetImplemented"}/>
        }
        return (
            <div>
                <div>
                    <div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <form className="ui form">
                                <h4 className="ui dividing header">Room Information</h4>
                                <div className="field">
                                    <div className="two fields">

                                        <div className="field">
                                            <div>
                                                Room Number: <input type={"text"} name={"roomNumber"} id={"roomNumber"}/>
                                                <br/>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div>
                                                Hotel Id: <input type={"text"} id={"hotelId"}/>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="two fields">
                                        <div className="field">
                                            <div>
                                                Capacity: <input type={"text"} id={"capacity"}/>
                                                <br/>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div>
                                                Price Per Night: <input type={"text"} id={"pricePerNight"}/>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default RoomForm