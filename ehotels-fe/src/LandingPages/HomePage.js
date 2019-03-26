import React from "react"
import {Link} from "react-router-dom";

class HomePage extends React.Component{
    render() {
        return(
            <div>
                <h1>Please Select Your Role</h1>
                <Link to={"/customer"}>
                    <button>Customer</button>
                </Link>
                 <h3> OR </h3>
                <Link to={"/employee"}>
                    <button>Employee</button>
                </Link>

            </div>
        )
    }
}

export default HomePage