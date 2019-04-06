import React from "react"
import SearchForm from "../Forms/SearchForm";
import {Link} from "react-router-dom";

function RoomItem(props) {
    return(
        <div className="ui cards">
            <div className="card">
                <div className="content">
                    <h3 className="ui left floated header">
                        Hotel Name
                        <div className="sub header">{props.data.hotelName}</div>
                    </h3>

                    <span className={"right floated"}> ${props.data.pricePerNight}/night</span>
                    <div className="description">
                        {/*Should we change this from room number to location ?*/}
                        <h3 className="ui left floated header">
                            Room Number
                            <div className="sub header">{props.data.roomNumber}</div>
                        </h3>
                        <h3 className="ui right floated header">
                            Capacity
                            <div className="sub header">{props.data.capacity}</div>
                        </h3>
                        {/*<span className={"left floated time"}>Room Number</span>*/}
                        {/*<span className={"right floated time"}> Capacity </span> <br/>*/}
                        {/*<span className={"left meta floated time"}>{props.data.roomNumber} </span>*/}
                        {/*<span className={"right meta floated time"}>{props.data.capacity} </span> <br/>*/}
                    </div>
                </div>
                <Link to={{pathname:"/newBooking",state:{id:props.data.roomNumber,hotelId:props.data.hotelId}}}>
                    <div className={"ui primary bottom attached button"} >
                        Book
                    </div>

                </Link>
            </div>
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