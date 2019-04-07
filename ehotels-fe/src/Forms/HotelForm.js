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
    props;
    constructor(props){
        super(props);
        this.props = props;
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
        // const hotelCity = document.getElementById("hotelCity").value
        const hotelProvince = document.getElementById("province").value
        const hotelPostalCode = document.getElementById("hotelPostalCode").value

        const data = {};
        if (hotelId && hotelId.length > 0) {
            data.id = hotelId;
        } else {
            data.id = 0;
        }
        data.hotelChainID = hotelChainId;
        data.name = hotelName;
        data.category = hotelCategory;
        data.roomCount = hotelRoomCount;
        data.email = hotelEmail;
        data.managerSIN = hotelManagerSIN;
        data.phoneNumber = hotelPhoneNumber;
        data.streetAddress = hotelStreetAddress;
        data.city = "";
        // data.city = hotelCity;
        data.province = hotelProvince;
        data.postalCode = hotelPostalCode;
        console.log(JSON.stringify(data));

        fetch("http://localhost:4567/addHotel", {
            method: "POST",
            body: JSON.stringify(data)
        }).then((response) => {
            return response.text()
        }, (error) => {

        }).then((data) => {
            console.log(data);
            const info = JSON.parse(data)
            if (info.err) {
                alert("an error occurred")
            } else {
                alert("Process successful")
            }
        })


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
                                        <select id={"country"} className="ui fluid search selection dropdown">
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