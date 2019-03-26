import React from 'react'
    function NewOrUpdate(props){
        if(props.new === "true"){
            return(
                <div>
                    Submit: <input  type={"submit"} id={"submit"} value={"Submit"}  onClick={()=> props.func(props.service)}/>
                </div>
            )
        }else {
            return(
                <div>
                    Update: <input  type={"submit"} id={"update"} value={"Update"}  onClick={()=> props.func(props.service)}/>
                </div>
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
        // const xhr = new XMLHttpRequest()
        // xhr.open('POST', '/server', true)
        // xhr.send(obj)
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
                {/*<form>*/}
                    <div>
                        SIN: <input type={"text"} name={"sin"} id={"sin"}/>
                        <br/>
                    </div>
                    <div>
                        Email: <input type={"text"} id={"email"}/>
                        <br/>
                    </div>
                    <div>
                        First Name: <input type={"text"} id={"firstname"}/>
                        <br/>
                    </div>
                    <div>
                        Last Name: <input type={"text"} id={"lastname"}/>
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
                        {button}

                        Cancel: <input  type={"submit"} id={"Cancel"} value={"Cancel"}  />
                        <br/>
                    </div>
                {/*</form>*/}
            </div>
        )
    }


}

export default CustomerForm