import React from "react"
import {Link} from "react-router-dom";

class CustomerPage extends React.Component{
    render() {
        return(
            <div>
                <Link to={"/"}>
                    <button>Home</button>
                </Link>
                <div>
                    Sign Up:
                    <Link to={"/addCustomer"}>
                        <button>Sign Up</button>
                    </Link>

                </div>
                <div>
                    Find Room:
                    <Link to={"/findRoom"}>
                        <button>Find Room</button>
                    </Link>

                </div>
            </div>
        )
    }
}

export default CustomerPage