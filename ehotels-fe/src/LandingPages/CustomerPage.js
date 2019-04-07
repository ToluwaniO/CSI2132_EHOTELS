import React from "react"
import {Link} from "react-router-dom";

class CustomerPage extends React.Component{
    render() {
        return(
            <div>
                <div className="ui three item menu">

                    <a className="item" href={"/"}>Home</a>

                    {/*<h3> OR </h3>*/}
                    <a className="item" href={"/addCustomer"}>Sign Up</a>

                    <a className="item" href={"/findRoom"}>Find Room</a>

                </div>
            </div>
        )
    }
}

export default CustomerPage