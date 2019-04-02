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

class RoomForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={submit:true};
        this.sendData=this.sendData.bind(this);
    }

    sendData(service){
        const hotelId = document.getElementById("hotelId").value
        const roomNumber = document.getElementById("roomNumber").value
        const capacity = document.getElementById("capacity").value
        const pricePerNight = document.getElementById("pricePerNight").value
        const obj = "{" +
            "\"hotelID\":\""+hotelId+"\","+
            "\"roomNumber\":\""+roomNumber+"\","+
            "\"capacity\":\""+capacity+"\","+
            "\"pricePerNight\":\""+pricePerNight+"\"}"
        console.log(obj)
        console.log(service)
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/server', true)
        xhr.send(obj)
    }
    render() {
        let button;
        //change this from a state based condition to a props based condition
        if (this.state.submit) {
            button = <NewOrUpdate new={"true"} func={this.sendData} service={"/notYetImplemented"}/>
        } else {
            button = <NewOrUpdate func={this.sendData} service={"/notYetImplemented"}/>
        }
        return (
            <div>
                {/*<form>*/}
                <div>
                    Hotel Id: <input type={"hotelId"} id={"hotelId"}/>
                    <br/>
                </div>
                <div>
                    Room Number: <input type={"text"} name={"roomNumber"} id={"roomNumber"}/>
                    <br/>
                </div>
                <div>
                    Capacity: <input type={"capacity"} id={"capacity"}/>
                    <br/>
                </div>
                <div>
                    Price Per Night: <input type={"pricePerNight"} id={"pricePerNight"}/>
                    <br/>
                </div>
                <div>
                    {button}

                    Cancel: <input type={"submit"} id={"Cancel"} value={"Cancel"}/>
                    <br/>
                </div>
                {/*</form>*/}
            </div>
        )
    }
}

export default RoomForm