import React from "react"
import SearchForm from "../Forms/SearchForm";
import {Link} from "react-router-dom";

function RoomItem(props) {
    return(
        <div>
            Hotel Name: {props.data.hotelName} <br/>
            Room Number: {props.data.roomNumber} <br/>
            Capacity: {props.data.capacity} <br/>
            Price Per Night: ${props.data.pricePerNight}<br/>
            Book:
            <Link to={{pathname:"/newBooking",state:{id:props.data.roomNumber,hotelId:props.data.hotelId}}}>
                <input type={"submit"} value={"Book"}/>
            </Link>

            {/*On click route to booking page with room Id page*/}
        </div>
    )
}

class RoomView extends React.Component{
    constructor(props){
        super(props)
        this.state = {data:[{
                roomNumber:300,
                hotelName:"Musaroq",
                capacity:"Doubble",
                pricePerNight:100
            }]}
        this.search=this.search.bind(this)
    }
    search(obj){
        console.log(obj)
        // fetch('https://api.mydomain.com/'+obj)
        //     .then(response => response.json())
        //     .then(data => this.setState({ data }));
    }
    componentDidMount() {
        this.search("")
    }
    render() {
        const roomItems = this.state.data.map(room => <RoomItem key={room.roomNumber} data={room}/>)
        return (
            <div>
                <SearchForm func={this.search}/>
                <div>
                    {roomItems}
                </div>
            </div>

        )
    }
}

export default RoomView