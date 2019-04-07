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
class HotelForm extends React.Component{
    constructor(props){
        super(props);
        this.sendData=this.sendData.bind(this);
    }

    sendData(service){
        const hotelId = document.getElementById("hotelId").value
        const hotelChainId = document.getElementById("hotelChainId").value
        const hotelName = document.getElementById("hotelName").value
        const hotelCategory = document.getElementById("hotelCategory").value
        const hotelRoomCount = document.getElementById("hotelRoomCount").value
        const hotelEmail = document.getElementById("hotelEmail").value
        const hotelManagerSIN = document.getElementById("hotelManagerSIN").value
        const hotelPhoneNumber = document.getElementById("hotelPhoneNumber").value
        const hotelStreetAddress = document.getElementById("hotelStreetAddress").value
        const hotelCity = document.getElementById("hotelCity").value
        const hotelProvince = document.getElementById("hotelProvince").value
        const hotelPostalCode = document.getElementById("hotelPostalCode").value

        const obj = "{" +
            "\"hotelId\":\""+hotelId+"\","+
            "\"hotelChainId\":\""+hotelChainId+"\","+
            "\"hotelName\":\""+hotelName+"\","+
            "\"hotelCategory\":\""+hotelCategory+"\","+
            "\"hotelRoomCount\":\""+hotelRoomCount+"\","+
            "\"hotelEmail\":\""+hotelEmail+"\","+
            "\"hotelManagerSIN\":\""+hotelManagerSIN+"\","+
            "\"hotelPhoneNumber\":\""+hotelPhoneNumber+"\","+
            "\"hotelStreetAddress\":\""+hotelStreetAddress+"\","+
            "\"hotelCity\":\""+hotelCity+"\","+
            "\"hotelProvince\":\""+hotelProvince+"\","+
            "\"hotelPostalCode\":\""+hotelPostalCode+"\"}"
        console.log(obj)
        console.log(service)
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/server', true)
        xhr.send(obj)


    }
    render(){
        let button;
        //change this from a state based condition to a props based condition
        if(this.props.submit){
            button = <NewOrUpdate new={"true"} func={this.sendData} service={"/notYetImplemented"}/>
        }else {
            button = <NewOrUpdate  func={this.sendData} service={"/notYetImplemented"}/>
        }
        return (
            <div>
                <div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <form className="ui form">
                            <h4 className="ui dividing header">Hotel Information</h4>
                            <div className="field">
                                <div className="two fields">

                                    <div className="field">
                                        <div>
                                            Hotel Id: <input type={"text"}  id={"hotelId"}/>
                                        </div>

                                    </div>
                                    <div className="field">
                                        <div>
                                            Hotel Chain Id: <input type={"text"}  id={"hotelChainId"}/>
                                        </div>

                                    </div>
                                </div>

                                <div className="two fields">
                                    <div className="field">
                                        <div>
                                            Name: <input type={"text"} id={"hotelName"}/>
                                            <br/>
                                        </div>

                                    </div>
                                    <div className="field">
                                        <label>Category</label>
                                        <select className="ui fluid dropdown" id={"hotelCategory"}>
                                            <option value="">Choose</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="two fields">

                                    <div className="field">
                                        <div>
                                            Room Count: <input type={"text"} id={"hotelRoomCount"}/>
                                            <br/>
                                        </div>


                                    </div>
                                    <div className="field">
                                        <div>
                                            E-mail: <input type={"text"} id={"hotelEmail"}/>
                                            <br/>
                                        </div>


                                    </div>
                                </div>
                                <div className="two fields">

                                    <div className="field">
                                        <div>
                                            Manager SIN: <input type={"text"} id={"hotelManagerSIN"}/>
                                            <br/>
                                        </div>


                                    </div>
                                    <div className="field">
                                        <div>
                                            Phone Number: <input type={"text"} id={"hotelPhoneNumber"}/>
                                            <br/>
                                        </div>


                                    </div>
                                </div>
                                <div className="two fields">

                                    <div className="field">
                                        <div>
                                            Street Address: <input type={"text"} id={"hotelStreetAddress"}/>
                                            <br/>
                                        </div>


                                    </div>
                                    <div className="field">
                                        <div>
                                            Postal Code: <input type={"text"} id={"hotelPostalCode"}/>
                                            <br/>
                                        </div>


                                    </div>
                                </div>
                                <div className="two fields">
                                    <div className="field">
                                        <label>State</label>
                                        <select className="ui fluid dropdown" id={"province"}>
                                            <option value="">State</option>
                                            <option value="ON">Ontario</option>
                                            <option value="QB">Quebec</option>
                                            <option value="MB">Manitoba</option>
                                            <option value="SK">Saskatoon</option>
                                        </select>
                                    </div>
                                    <div className="field">
                                        <label>Country</label>
                                        <select className="ui fluid search selection dropdown">
                                            <option value="">Country</option>
                                            <option className="item" data-value="af">Canada</option>
                                            <option className="item" data-value="af">America</option>
                                            <option className="item" data-value="af">Others</option>
                                        </select>
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
        )
    }
}

export default HotelForm