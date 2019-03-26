import React from "react"

class SearchForm extends React.Component{
    constructor(props){
        super(props);
        // this.state ={submit:true};
        this.sendData=this.sendData.bind(this);
    }
    sendData(){

        const startDate = document.getElementById("startDate").value
        const endDate = document.getElementById("endDate").value
        const roomCapacity = document.getElementById("roomCapacity").value
        const city = document.getElementById("city").value
        const province = document.getElementById("province").value
        const hotelChainName = document.getElementById("hotelChainName").value
        const hotelCategory = document.getElementById("hotelCategory").value
        const hotelRoomCapacity = document.getElementById("hotelRoomCapacity").value
        const pricePerNight = document.getElementById("pricePerNight").value
        const obj = "{" +
            "\"startDate\":\""+startDate+"\","+
            "\"endDate\":\""+endDate+"\","+
            "\"roomCapacity\":\""+roomCapacity+"\","+
            "\"city\":\""+city+"\","+
            "\"province\":\""+province+"\","+
            "\"hotelChainName\":\""+hotelChainName+"\","+
            "\"hotelCategory\":\""+hotelCategory+"\","+
            "\"hotelRoomCapacity\":\""+hotelRoomCapacity+"\","+
            "\"pricePerNight\":\""+pricePerNight+"\"" +
            "}"
        //need to make sure api calls work
        // console.log(obj)
        this.props.func(obj)
        // const xhr = new XMLHttpRequest()
        // xhr.open('GET', '/server', true)
        // xhr.send(obj)
    }
    render(){
        return(
            <div>
                <div>
                    Start Date: <input type={"date"} id={"startDate"}/>
                    <br/>
                </div>
                <div>
                    End Date: <input type={"date"} id={"endDate"}/>
                    <br/>
                </div>
                <div>
                    Room Capacity: <input type={"text"} id={"roomCapacity"}/>
                </div>
                <div>
                    City: <input type={"text"} id={"city"}/>
                </div>
                <div>
                    Province: <input type={"text"} id={"province"}/>
                </div>
                <div>
                    Hotel Chain Name: <input type={"text"} id={"hotelChainName"}/>
                </div>
                <div>
                    Hotel Category: <input type={"text"} id={"hotelCategory"}/>
                </div>
                <div>
                    Hotel Room Capacity: <input type={"text"} id={"hotelRoomCapacity"}/>
                </div>
                <div>
                    Price Per Night: <input type={"number"} id={"pricePerNight"}/>
                </div>
                <div>
                    Search: <input type={"submit"} id={"submit"} value={"Search"} onClick={this.sendData}/>
                </div>
            </div>
        )
    }
}

export default SearchForm