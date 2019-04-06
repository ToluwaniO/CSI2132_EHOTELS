import React from "react"
import {Link} from "react-router-dom";

class PaymentForm extends React.Component{
    render() {
        return(
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <form className="ui form">
                    <h4 className="ui dividing header">Billing Information</h4>
                    <div className="field">
                        <label>Name</label>
                        <div className="two fields">
                            <div className="field">
                                <input type="text" name="shipping[first-name]" placeholder="First Name"/>
                            </div>
                            <div className="field">
                                <input type="text" name="shipping[last-name]" placeholder="Last Name"/>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label>Billing Address</label>
                        <div className="fields">
                            <div className="twelve wide field">
                                <input type="text" name="shipping[address]" placeholder="Street Address"/>
                            </div>
                            <div className="four wide field">
                                <input type="text" name="shipping[address-2]" placeholder="Apt #"/>
                            </div>
                        </div>
                    </div>
                    <div className="two fields">
                        <div className="field">
                            <label>State</label>
                            <select className="ui fluid dropdown">
                                <option value="">State</option>
                                <option value="ON">Ontario</option>
                                <option value="QB">Quebec</option>
                                <option value="MB">Manitoba</option>
                                <option value="SK">Saskatoon</option>
                                <option value="AL">Alabama</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                        <div className="field">
                            <label>Country</label>
                            <select className="ui fluid search selection dropdown">
                                <option value="">Country</option>
                                <option className="item" data-value="af">Canada</option>
                                <option className="item" data-value="af">America</option>
                                <option className="item" data-value="af">Others</option>
                            </select>
                        </div>
                    </div>
                    {/*<h4 className="ui dividing header">Billing Information</h4>*/}
                    {/*<div className="field">*/}
                    {/*    <label>Card Type</label>*/}
                    {/*    <select className="ui selection dropdown">*/}
                    {/*        <input type="hidden" name="card[type]"/>*/}
                    {/*        <div className="default text">Type</div>*/}
                    {/*        <i className="dropdown icon"></i>*/}
                    {/*        <div className="menu">*/}
                    {/*            <div className="item" data-value="visa">*/}
                    {/*                <i className="visa icon"></i>*/}
                    {/*                Visa*/}
                    {/*            </div>*/}
                    {/*            <div className="item" data-value="amex">*/}
                    {/*                <i className="amex icon"></i>*/}
                    {/*                American Express*/}
                    {/*            </div>*/}
                    {/*            <div className="item" data-value="discover">*/}
                    {/*                <i className="discover icon"></i>*/}
                    {/*                Discover*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    <div className="fields">
                        <div className="seven wide field">
                            <label>Card Number</label>
                            <input type="text" name="card[number]" maxLength="16" placeholder="Card #"/>
                        </div>
                        <div className="three wide field">
                            <label>CVC</label>
                            <input type="text" name="card[cvc]" maxLength="3" placeholder="CVC"/>
                        </div>
                        <div className="six wide field">
                            <label>Expiration</label>
                            <div className="two fields">
                                <div className="field">
                                    <select className="ui fluid search dropdown" name="card[expire-month]">
                                        <option value="">Month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <input type="text" name="card[expire-year]" maxLength="4" placeholder="Year"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to={"/employee"}>
                        <input className={"ui button"} type={"submit"} tabIndex="0" value={"Process Payment"}/>
                    </Link>

                </form>
            </div>
        )
    }
}

export default PaymentForm