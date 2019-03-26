import React, { Component } from 'react';
import './App.css';
import CustomerForm from "./Forms/CustomerForm";
import HotelChainForm from "./Forms/HotelChainForm";
import HotelForm from "./Forms/HotelForm";
import RoomForm from "./Forms/RoomForm";
import RentalBookingForm from "./Forms/RentalBookingForm";
import SearchForm from "./Forms/SearchForm";
import PaymentForm from "./Forms/PaymentForm";
import BookingView from "./Views/BookingView";
import RoomView from "./Views/RoomView";
import DeletePage from "./LandingPages/DeletePage";
import EmployeePage from "./LandingPages/EmployeePage";
import CustomerPage from "./LandingPages/CustomerPage";
import HomePage from "./LandingPages/HomePage";

class App extends Component {
  render() {
    return (
      <div>
        {/*<CustomerForm/>*/}
        {/*<HotelChainForm/>*/}
        {/*<HotelForm/>*/}
        {/*<RoomForm/>*/}
        {/*<RentalBookingForm new={false} rental={false} />*/}
        {/*<SearchForm/>*/}
        {/*<PaymentForm/>*/}
        {/*<BookingView/>*/}
        {/*<RoomView/>*/}
        {/*<DeletePage/>*/}
        {/*<EmployeePage/>*/}
        {/*<CustomerPage/>*/}
        <HomePage/>
      </div>
    )
  }
}

export default App;
