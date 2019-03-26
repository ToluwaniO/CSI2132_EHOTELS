import React from "react"
import {Link} from "react-router-dom";

class PaymentForm extends React.Component{
    render() {
        return(
            <div>
                <div>
                    First Name: <input type={"text"} id={"firstname"}/>
                    <br/>
                </div>
                <div>
                    Last Name: <input type={"text"} id={"lastname"}/>
                    <br/>
                </div>
                <div>
                    Credit Card Number: <input type={"text"} id={"creditCard"}/>
                    <br/>
                </div>
                <div>
                    Expiry Date: <input type={"text"} id={"expDate"} placeholder={"MM/YY"}/>

                    CVV: <input type={"text"} id={"cvv"} placeholder={"XXX"}/>
                    <br/>
                </div>
                <div>
                    Street Address: <input type={"text"} id={"streetAddress"}/>
                    <br/>
                </div>
                <div>
                    City: <input type={"text"} id={"city"}/>
                    <br/>
                </div>
                <div>
                    Province: <input type={"text"} id={"province"}/>
                    <br/>
                </div>
                <div>
                    Postal Code: <input type={"text"} id={"postalCode"}/>
                    <br/>
                </div>
                <div>
                    <Link to={"/employee"}>
                        <input type={"submit"} id={"pay"} value={"Process Payment"}/>
                    </Link>

                </div>
            </div>
        )
    }
}

export default PaymentForm