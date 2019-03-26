import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import CustomerForm from "./Forms/CustomerForm";
import HotelChainForm from "./Forms/HotelChainForm";
import HotelForm from "./Forms/HotelForm";
import RoomForm from "./Forms/RoomForm";
import RentalBookingForm from "./Forms/RentalBookingForm";
import PaymentForm from "./Forms/PaymentForm";
import BookingView from "./Views/BookingView";
import RoomView from "./Views/RoomView";
import DeletePage from "./LandingPages/DeletePage";
import EmployeePage from "./LandingPages/EmployeePage";
import CustomerPage from "./LandingPages/CustomerPage";


const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route  exat path="/employee"  render={() => <EmployeePage/>} />

            <Route exact path="/customer" component={CustomerPage} />

            <Route  exat path="/addEmployee"  render={(props) =>
                <CustomerForm {...props} submit={true} service={"employee notYetImplemented"}/>} />

            <Route  exat path="/updateEmployee"  render={(props) =>
                <CustomerForm {...props} new={false} service={"update employee notYetImplemented"}/>} />

            <Route  exat path="/addCustomer"  render={(props) =>
                <CustomerForm {...props} submit={true} service={"customer notYetImplemented"}/>} />

            <Route  exat path="/updateCustomer"  render={(props) =>
                <CustomerForm {...props} new={false} service={"update customer notYetImplemented"}/>} />

            <Route  exat path="/addHotelChain"  render={() => <HotelChainForm/>} />

            <Route  exat path="/addHotel"  render={() => <HotelForm/>} />

            <Route  exat path="/updateHotel"  render={(props) => <HotelForm
                {...props} new={false} service={"update employee notYetImplemented"}/>} />

            <Route  exat path="/addRoom"  render={() => <RoomForm/>} />

            <Route  exat path="/updateRoom"  render={(props) => <RoomForm
                {...props} new={false} service={"update employee notYetImplemented"}/>} />

            <Route  exat path="/newRental"  render={(props) => <RentalBookingForm
                {...props} submit={true} service={"rental notYetImplemented"} rental={true}/>} />

            <Route  exat path="/newBooking"  render={(props) => <RentalBookingForm
                {...props} submit={true} service={"booking notYetImplemented"}/>} />

            <Route  exat path="/findRoom"  render={() => <RoomView/>} />

            <Route  exat path="/findBooking"  render={() => <BookingView/>} />

            <Route  exat path="/pay"  render={() => <PaymentForm/>} />

            <Route  exat path="/deleteData"  render={(props) => <DeletePage
                {...props} delete={true}/>} />

            <Route  exat path="/updateData"  render={(props) => <DeletePage
            />} />
        </div>
    </Router>
)


ReactDOM.render(routing, document.getElementById('root'));