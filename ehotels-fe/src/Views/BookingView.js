import React from "react"
import {Link} from "react-router-dom";

function BookingSearchForm(props) {
    return (
        <div>
            Customer SIN: <input type={"text"} id={"customerSIN"}/>
            Booking Id: <input type={"text"} id={"bookingId"}/>
            Search: <input type={"submit"} value={"Search"} onClick={() => props.func(
                document.getElementById("customerSIN").value,document.getElementById("bookingId").value
        )}/>
        </div>
    )
}

function BookingItem(props) {
    return(
        <div>
            Hotel Name: {props.data.hotelName} <br/>
            Room Number: {props.data.roomNumber} <br/>
            Start Time: {props.data.startTime}<br/>
            End Time: {props.data.endTime}<br/>
            customerSIN: {props.data.customerSIN} <br/>
            Rent:
            <Link to={"/pay"}>
                <input type={"submit"} value={"Rent"}/>
            </Link>

            {/*on clicking rent route to the check out page*/}

        </div>
    )
}

class BookingView extends React.Component{
    constructor(props){
        super(props)
        this.state = {data:[{
                "bookingId":"0001",
                "hotelName":"Musaroq Hotel",
                "startTime":"15/01/1998",
                "endTime":"15/01/3000",
                "roomNumber":"005",
                "customerSIN":"887"
        }]}
        this.search=this.search.bind(this)


    }

    componentDidMount() {
        this.search("","")
    }

    search(customerSIN,bookingId){
        console.log('https://api.mydomain.com/'+customerSIN+"/"+bookingId)
        // fetch('https://api.mydomain.com/'+customerSIN+"/"+bookingId)
        //     .then(response => response.json())
        //     .then(data => this.setState({ data }));
    }
    render() {
        const bookingItems = this.state.data.map(booking => <BookingItem key={booking.bookingId} data={booking}/>)
        return (
            <div>
                <BookingSearchForm func={this.search}/>
                <div>
                    {bookingItems}
                </div>

            </div>

        )
    }
}

export default BookingView