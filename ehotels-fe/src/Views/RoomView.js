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
            <div  style={{margin:"auto",padding:"20px"}}>
                <div className="card" style={{float: "left", width:"400px"}}>
                    <SearchForm func={this.search}/>
                </div>

                <div style={{float: "right", marginLeft:"5px" }}>
                    {roomItems}
                </div>

            </div>

        )
    }
}

export default RoomView