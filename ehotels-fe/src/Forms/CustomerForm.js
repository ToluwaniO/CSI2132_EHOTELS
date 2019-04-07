import React from 'react'
import {Link} from "react-router-dom"

    function NewOrUpdate(props){
        if(props.new === "true"){
            return(

                <Link to={"/employee"}>
                    <input className={"ui primary button"} type={"submit"} tabIndex="0" id={"submit"} value={"Submit"} onClick={()=> props.func(props.service)}/>
                </Link>

            )
        }else {
            return(

                <Link to={"/employee"}>
                    <input className={"ui primary button"}  id={"update"} type={"submit"} tabIndex="0" value={"Update"} onClick={()=> props.func(props.service)}/>
                </Link>

            )
        }

    }

class CustomerForm extends React.Component{
    constructor(props){
        super(props);
        this.sendData=this.sendData.bind(this);
    }

    sendData(){
        const sin = document.getElementById("sin").value
        const firstname = document.getElementById("firstname").value
        const lastname = document.getElementById("lastname").value
        const registrationDate = new Date()
        const streetAddress = document.getElementById("streetAddress").value
        const city = document.getElementById("city").value
        const province = document.getElementById("province").value
        const postalCode = document.getElementById("postalCode").value
        const obj = "{" +
            "\"sin\":\""+sin+"\","+
            "\"firstname\":\""+firstname+"\","+
            "\"lastname\":\""+lastname+"\","+
            "\"registrationDate\":\""+registrationDate+"\","+
            "\"streetAddress\":\""+streetAddress+"\","+
            "\"city\":\""+city+"\","+
            "\"province\":\""+province+"\","+
            "\"postalCode\":\""+postalCode+"\"}"
        console.log(obj)
        console.log(this.props.service)
        const xhr = new XMLHttpRequest()
        xhr.open('GET', 'localhost:4567/hello', true)
        xhr.onload = function(e) {
            console.log(xhr.responseText)
            console.log(xhr.statusText)
        }
        xhr.send(obj)
        //  need to find right way of sending request
    }
    render(){
        let button;
        //change this from a state based condition to a props based condition
        if(this.props.submit){
            button = <NewOrUpdate new={"true"} func={this.sendData} />
        }else {
            button = <NewOrUpdate  func={this.sendData} />
        }
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <form className="ui form">
                        <h4 className="ui dividing header">Customer Information</h4>
                        <div className="field">
                            <label>Name</label>
                            <div className="two fields">
                                <div className="field">
                                    <input type="text" id={"sin"} name={"sin"}placeholder="SIN"/>
                                </div>
                                <div className="field">
                                    <input type="text" placeholder="EMail" id={"email"}/>
                                </div>
                            </div>

                            <div className="two fields">
                                <div className="field">
                                    <input type="text" id={"firstname"} placeholder="First Name"/>
                                </div>
                                <div className="field">
                                    <input type="text" id={"lastname"} placeholder="Last Name"/>
                                </div>
                            </div>


                        </div>
                        <div className="field">
                            <label> Address</label>
                            <div className="fields">
                                <div className="twelve wide field">
                                    <input type="text"  id={"streetAddress"} placeholder="Street Address"/>
                                </div>
                                <label> Postal Code</label>
                                <div className="four wide field">
                                    <input type="text" id={"postalCode"} placeholder="Postal Code"/>
                                </div>
                            </div>
                        </div>
                        <div className="two fields">
                            <div className="field">
                                <label>State</label>
                                <select className="ui fluid dropdown" id={"province"}>
                                    <option value="">State</option>
                                    <option value="ON">Ontario</option>
                                    <option value="QB">Quebec</option>
                                    <option value="MB">Manitoba</option>
                                    <option value="SK">Saskatoon</option>
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

                        <div>
                            <span> {button}</span>
                            <span>
                                <input style={{float:"right"}} className={"ui  button"} type={"submit"} tabIndex="0" id={"Cancel"} value={"Cancel"} />
                            </span>

                            <br/>


                        </div>
                    </form>

                </div>



            </div>
        )
    }


}

export default CustomerForm;