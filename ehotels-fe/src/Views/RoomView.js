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
                <Link to={{pathname:"/newBooking",state:props.data}}>
                    <div className={"ui primary bottom attached button"} >
                        Book
                    </div>

                </Link>
            </div>
        </div>
    )
}

class RoomView extends React.Component{
// {
//     roomNumber:300,
//     hotelName:"Musaroq",
//     capacity:"Doubble",
//     pricePerNight:100
// }
    constructor(props){
        super(props)
        this.state = {data:[]};
        this.search=this.search.bind(this)
        this.sendData=this.sendData.bind(this);
    }
    search(obj){
        console.log(obj)
        fetch('http://localhost:4567/rooms')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const arr = data.data;
                this.setState({ data:arr })
                console.log(this.state)
            });
    }
    componentDidMount() {
        this.search("")
    }
    render() {
        const roomItems = this.state.data.map(room => <RoomItem key={room.roomNumber} data={room}/>)
        return (
            <div  style={{margin:"auto",padding:"20px"}}>
                <div className="card" style={{float: "left", width:"400px"}}>
                    {/*<SearchForm func={this.search}/>*/}
                    <div>
                        <form className="ui form">
                            <div>
                                <div className={"two fields"} >
                                    <div className={"field"}>
                                        <label>Hotel Chain</label>
                                        <select id={"hotelChainId"} className="ui fluid dropdown">
                                            <option value="">Choose</option>
                                            <option value="1">Four Points</option>
                                            <option value="2">Coast Hotels</option>
                                            <option value="3">Four Seasons Hotels and Resorts</option>
                                            <option value="4">Red Roof Inn</option>
                                            <option value="5">Prince Hotels</option>
                                            {/*<option value="QB">Quebec</option>*/}
                                        </select>
                                    </div>

                                    <div className={"field"}>
                                        <label>Hotel Rating</label>
                                        <select id={"category"} className="ui fluid dropdown">
                                            <option value="">Choose</option>
                                            <option value="1">1 Star</option>
                                            <option value="2">2 Star</option>
                                            <option value="3">3 Star</option>
                                            <option value="4">4 Star</option>
                                            <option value="5">5 Star</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </form>

                        <form className="ui form">
                            <div>
                                <div className={"three fields"} >
                                    <div className={"field"}>
                                        <h4 >
                                            Price/Night
                                            <div className="ui right labeled input">
                                                <label htmlFor="amount" className="ui label">$</label>
                                                <input type="text" placeholder="Amount" id="amount"/>
                                            </div>
                                        </h4>

                                    </div>

                                    <div className={"field"}>
                                        <label>Capacity</label>
                                        <select className="ui fluid dropdown">
                                            <option value="">Choose</option>
                                            <option value="FP">Single</option>
                                            {/*<option value="QB">Quebec</option>*/}
                                        </select>
                                    </div>

                                    <div className={"field"}>
                                        <label>Rooms</label>
                                        <div className="ui right labeled input">
                                            <input type="number" placeholder="Number" id="rooms"/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>

                        <form className="ui form">
                            <div>
                                <div className={"two fields"} >
                                    <div className={"field"}>
                                        <h4 className="ui left floated header">
                                            Check In
                                            <input type={"date"} id={"startDate"}/>
                                        </h4>
                                    </div>

                                    <div className={"field"}>
                                        <h4 className="ui right floated header">
                                            Check Out
                                            <input type={"date"} id={"endDate"}/>
                                        </h4>
                                    </div>
                                </div>

                            </div>
                        </form>

                        <form className="ui form">
                            <div className={"field"}>
                                <label>Location</label>
                                <select id={"province"} className="ui fluid dropdown">
                                    <option value="">Choose</option>
                                    <option value="ontario">Ontario</option>
                                    <option value="quebec">Quebec</option>
                                    <option value="saskatoon">Saskatoon</option>
                                    <option value="manitoba">Manitoba</option>
                                </select>
                            </div>
                        </form>
                        <br/>
                        <div >
                            <input className={"ui button right floated"} type={"submit"} tabIndex="0" value={"Search"} onClick={this.sendData}/>
                        </div>
                    </div>
                </div>

                <div style={{float: "right", marginLeft:"5px" }}>
                    {roomItems}
                </div>

            </div>

        )
    }

    sendData(){

        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;
        const province = document.getElementById("province").value;
        const hotelChainId = document.getElementById("hotelChainId").value;
        const hotelCategory = document.getElementById("category").value;
        let url = "http://localhost:4567/search";
        const data = {};
        data.startDate = new Date(startDate).getTime();
        data.endDate = new Date(endDate).getTime();
        data.province = province;
        data.hotelChainID = hotelChainId;
        data.category = hotelCategory;
        // data.pricePerNight = pricePerNight;
        console.log(JSON.stringify(data));

        for (const key in  data) {
            if (data.hasOwnProperty(key) && data[key] != null && data[key].toString().length > 0) {
                url = `${url}?${key}=${data[key]}`;
            }
        }
        console.log(url);
        fetch(url, {
            method:"GET",
        }).then((response) => {
            return response.json()
        }, (err) => {
            console.log(err)
        }).then((text) => {
            this.setState({ data:text.data })
            console.log(text)
        })

    }
}

export default RoomView