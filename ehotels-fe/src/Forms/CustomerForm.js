import React from 'react'

// import { withStyles } from '@material-ui/core/styles'

// const styles = theme => ({
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     textField: {
//         marginLeft: theme.spacing.unit,
//         marginRight: theme.spacing.unit,
//     },
//     dense: {
//         marginTop: 16,
//     },
//     menu: {
//         width: 200,
//     },
// });

    function NewOrUpdate(props){
        if(props.new === "true"){
            return(

                    <input className={"ui primary button"} type={"submit"} tabIndex="0" id={"submit"} value={"Submit"} onClick={()=> props.func(props.service)}/>

            )
        }else {
            return(

                    <input className={"ui primary button"}  id={"update"} type={"submit"} tabIndex="0" value={"Update"} onClick={()=> props.func(props.service)}/>

            )
        }

    }

class CustomerForm extends React.Component{
    constructor(props){
        super(props);
        this.sendData=this.sendData.bind(this);
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

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
        // const xhr = new XMLHttpRequest()
        // xhr.open('POST', '/server', true)
        // xhr.send(obj)
        //  need to find right way of sending request
    }
    render(){
        const { classes } = this.props;
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