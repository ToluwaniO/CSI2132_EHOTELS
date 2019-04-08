import React from "react"
import {Link} from "react-router-dom";
import SearchForm from "../Forms/SearchForm";

function BookingSearchForm(props) {
    return (
        <div>
            <form className="ui form">
                <div>
                    <div className="two fields">
                        <div className="field">
                            <input type={"text"} id={"customerSIN"} placeholder={"Customer SIN"}/>
                        </div>
                        <div className="field">
                            <input type={"text"} id={"bookingId"} placeholder={"Booking Id"}/>
                        </div>
                        <input className={"ui primary button"} type={"submit"} tabIndex="0" id={"submit"} value={"Submit"} onClick={() => props.func(
                            document.getElementById("customerSIN").value,document.getElementById("bookingId").value)}/>
                    </div>

                </div>

            </form>
        </div>
    )
}

function BookingItem(props) {
    return(
        <div>
            <div className="ui cards">
                <div className="card">
                    <div className="content">
                        <h3 className="ui left floated header">
                            Hotel Name
                            <div className="sub header">{props.data.hotelName}</div>
                        </h3>
                        <div className="description">
                            {/*Should we change this from room number to location ?*/}
                            <h3 className="ui left floated header">
                                Room Number
                                <div className="sub header">{props.data.roomNumber}</div>
                            </h3>
                            <h3 className="ui right floated header">
                                Customer SIN
                                <div className="sub header">{props.data.customerSIN}</div>
                            </h3>

                            <h3 className="ui left floated header">
                                Check In
                                <div className="sub header">{(new Date(props.data.startTime).toDateString())}</div>
                            </h3>
                            <h3 className="ui right floated header">
                                Check Out
                                <div className="sub header">{(new Date(props.data.endTime).toDateString())}</div>
                            </h3>

                        </div>
                    </div>
                    <Link to={"/pay"}>
                        <div className={"ui primary bottom attached button"} >
                            Rent
                        </div>

                    </Link>
                </div>
            </div>

            {/*on clicking rent route to the check out page*/}

        </div>
    )
}

function HotelSelection(props) {
    return(
        <option value={props.hotel.name}>props.hotel.name</option>
    )
}

class BookingView extends React.Component{
    constructor(props){
        super(props)
        this.state = {data:[{
                "id":"0001",
                "name":"Musaroq Hotel",
                "startTime":"15/01/1998",
                "endTime":"15/01/3000",
                "roomNumber":"005",
                "customerSIN":"887"
        }],hotels:[]}
        this.search=this.search.bind(this)
        // this.rent = this.rent.bind(this);
        this.getHotels=this.getHotels.bind(this)
        // props.rent=this.rent();


    }

    componentDidMount() {
        this.search("","")
        this.getHotels()
    }

    // rent() {
    //     const data = this.state.data[0];
    //     data.employeeID = "000000001";
    //     console.log(data);
    //     fetch("http://localhost:4567/bookingToRental", {
    //         method: "POST",
    //         body:data
    //     }).then((response) => {
    //         return response.json()
    //     }, (error) => {
    //         console.log(error)
    //     }).then((data) => {
    //         console.log(data)
    //     })
    // }

    search(customerSIN,bookingId){
        let url = "http://localhost:4567/findBooking";
        if (customerSIN && customerSIN.length > 0) {
            url = `${url}?customerSIN=${customerSIN}`;
        }
        if (bookingId && bookingId.length > 0) {
            url = `${url}?bookingID=${bookingId}`;
        }
        fetch(url, {
            method: "GET",
        })
        .then((response) => {
            return response.text()
        }, (error) => {
            console.error(error)
        })
        .then((data) => {
            console.log(data);
            const d = JSON.parse(data).data;
            this.setState({ data:d })
        });
    }

    getHotels(){
        fetch('http://localhost:4567/hotels')
            .then(response => response.json())
            .then(hotels => this.setState({ hotels }));
    }
    render() {
        const bookingItems = this.state.data.map(booking => <BookingItem key={booking.id} data={booking}/>)
        // const hotelOptions = this.state.hotels.map(hotel => <HotelSelection key={hotel.hotelId} data={hotel}/>)
        return (
            <div  style={{margin:"auto",padding:"20px"}}>
                <div className="card" style={{ width:"400px"}}>
                    <BookingSearchForm func={this.search}/>

                </div>

                <div style={{ marginLeft:"5px" }}>
                    {bookingItems}
                </div>

            </div>

        )
    }
}

export default BookingView