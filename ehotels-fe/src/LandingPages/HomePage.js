import React from "react"
import {Link} from "react-router-dom";

class HomePage extends React.Component{
    render() {
        return(
            <div>
                <div className="ui two item menu">

                        <a className="item" href={"/customer"}>Customer</a>

                    {/*<h3> OR </h3>*/}
                    <a className="item" href={"/employee"}>Employee</a>

                </div>
                <h1>Please Select Your Role</h1>
                {/*<Link to={"/customer"}>*/}

                {/*</Link>*/}
                {/*/!*<h3> OR </h3>*!/*/}
                {/*<Link to={"/employee"}>*/}
                {/*    <a className="item">Employee</a>*/}
                {/*</Link>*/}

            </div>
        )
    }
}

export default HomePage