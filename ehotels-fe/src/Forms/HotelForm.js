import React from "react"

    function NewOrUpdate(props){
        if(props.new === "true"){
            return(
                <div>
                    Submit: <input  type={"submit"} id={"submit"} value={"Submit"}  onClick={()=> props.func(props.service)}/>
                </div>
            )
        }else {
            return(
                <div>
                    Update: <input  type={"submit"} id={"update"} value={"Update"}  onClick={()=> props.func(props.service)}/>
                </div>
            )
        }
    }
class HotelForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={submit:true};
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
            "\"id\":\""+hotelId+"\","+
            "\"hotelChainID\":\""+hotelChainId+"\","+
            "\"name\":\""+hotelName+"\","+
            "\"category\":\""+hotelCategory+"\","+
            "\"roomCount\":\""+hotelRoomCount+"\","+
            "\"email\":\""+hotelEmail+"\","+
            "\"managerSIN\":\""+hotelManagerSIN+"\","+
            "\"phoneNumber\":\""+hotelPhoneNumber+"\","+
            "\"streetAddress\":\""+hotelStreetAddress+"\","+
            "\"city\":\""+hotelCity+"\","+
            "\"province\":\""+hotelProvince+"\","+
            "\"postalCode\":\""+hotelPostalCode+"\"}";
        console.log(obj);
        console.log(service);
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/server', true)
        xhr.send(obj)


    }
    render(){
        let button;
        //change this from a state based condition to a props based condition
        if(this.state.submit){
            button = <NewOrUpdate new={"true"} func={this.sendData} service={"/notYetImplemented"}/>
        }else {
            button = <NewOrUpdate  func={this.sendData} service={"/notYetImplemented"}/>
        }
        return (
            <div>
                {/*<form>*/}
                <div>
                    Hotel Id: <input type={"text"}  id={"hotelId"}/>
                    <br/>
                </div>
                <div>
                    Hotel Chain Id: <input type={"text"}  id={"hotelChainId"}/>
                    <br/>
                </div>
                <div>
                    Name: <input type={"text"} id={"hotelName"}/>
                    <br/>
                </div>
                <div>
                    Category: <input type={"text"} id={"hotelCategory"}/>
                    <br/>
                </div>
                <div>
                    Room Count: <input type={"text"} id={"hotelRoomCount"}/>
                    <br/>
                </div>
                <div>
                    E-mail: <input type={"text"} id={"hotelEmail"}/>
                    <br/>
                </div>
                <div>
                    Manager SIN: <input type={"text"} id={"hotelManagerSIN"}/>
                    <br/>
                </div>
                <div>
                    Phone Number: <input type={"text"} id={"hotelPhoneNumber"}/>
                    <br/>
                </div>
                <div>
                    Street Address: <input type={"text"} id={"hotelStreetAddress"}/>
                    <br/>
                </div>
                <div>
                    City: <input type={"text"} id={"hotelCity"}/>
                    <br/>
                </div>
                <div>
                    Province: <input type={"text"} id={"hotelProvince"}/>
                    <br/>
                </div>
                <div>
                    Postal Code: <input type={"text"} id={"hotelPostalCode"}/>
                    <br/>
                </div>
                <div>
                    {button}

                    Cancel: <input  type={"submit"} id={"Cancel"} value={"Cancel"}  />
                    <br/>
                </div>
                {/*</form>*/}
            </div>
        )
    }
}

export default HotelForm