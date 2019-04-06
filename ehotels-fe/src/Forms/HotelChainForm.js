import React from "react"

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
class HotelChainForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={submit:true};
        this.sendData=this.sendData.bind(this);
    }

    sendData(service){
        const hotelChainId = document.getElementById("hotelChainId").value
        const hotelChainName = document.getElementById("hotelChainName").value
        const hotelChainCategory = document.getElementById("hotelChainCategory").value


        const obj = "{" +
            "\"hotelChainId\":\""+hotelChainId+"\","+
            "\"hotelChainName\":\""+hotelChainName+"\","+
            "\"hotelChainCategory\":\""+hotelChainCategory+"\"}"
        console.log(obj)
        console.log(service)
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/server', true)
        xhr.send(obj)


    }
    render() {
        let button;
        //change this from a state based condition to a props based condition
        if(this.state.submit){
            button = <NewOrUpdate new={"true"} func={this.sendData} service={"/notYetImplemented"}/>
        }else {
            button = <NewOrUpdate  func={this.sendData} service={"/notYetImplemented"}/>
        }
        return(
            <div>
                {/*<form>*/}
                <div>
                    Hotel Chain Id: <input type={"hotelChainName"} id={"hotelChainName"}/>
                    <br/>
                </div>
                <div>
                    Hotel Chain Name: <input type={"text"} name={"hotelChainId"} id={"hotelChainId"}/>
                    <br/>
                </div>
                <div>
                    Hotel Chain Category: <input type={"hotelChainCategory"} id={"hotelChainCategory"}/>
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
export default HotelChainForm