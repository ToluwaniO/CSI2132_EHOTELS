import React from "react"

class SearchForm extends React.Component{
    constructor(props){
        super(props);
        // this.state ={submit:true};
        this.sendData=this.sendData.bind(this);
    }

    sendData(){

        const startDate = document.getElementById("startDate").value
        const endDate = document.getElementById("endDate").value
        const roomCapacity = document.getElementById("roomCapacity").value
        const city = document.getElementById("city").value
        const province = document.getElementById("province").value
        const hotelChainName = document.getElementById("hotelChainName").value
        const hotelCategory = document.getElementById("hotelCategory").value
        const hotelRoomCapacity = document.getElementById("hotelRoomCapacity").value
        const pricePerNight = document.getElementById("pricePerNight").value
        const obj = "{" +
            "\"startDate\":\""+startDate+"\","+
            "\"endDate\":\""+endDate+"\","+
            "\"roomCapacity\":\""+roomCapacity+"\","+
            "\"city\":\""+city+"\","+
            "\"province\":\""+province+"\","+
            "\"hotelChainName\":\""+hotelChainName+"\","+
            "\"hotelCategory\":\""+hotelCategory+"\","+
            "\"hotelRoomCapacity\":\""+hotelRoomCapacity+"\","+
            "\"pricePerNight\":\""+pricePerNight+"\"" +
            "}"
        //need to make sure api calls work
        // console.log(obj)
        this.props.func(obj)
        // const xhr = new XMLHttpRequest()
        // xhr.open('GET', '/server', true)
        // xhr.send(obj)
    }
    render(){
        return(
            <div>
                <form className="ui form">
                    <div>
                        <div className={"two fields"} >
                            <div className={"field"}>
                                <label>Hotel Chain</label>
                                <select className="ui fluid dropdown">
                                    <option value="">Choose</option>
                                    <option value="FP">Four Points</option>
                                    {/*<option value="QB">Quebec</option>*/}
                                </select>
                            </div>

                            <div className={"field"}>
                                <label>Hotel Rating</label>
                                <select className="ui fluid dropdown">
                                    <option value="">Choose</option>
                                    <option value="1">1 Star</option>
                                    <option value="2">2 Star</option>
                                    <option value="3">3 Star</option>
                                    <option value="4">4 Star</option>
                                    <option value="5">5 Star</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </form>

                <form className="ui form">
                    <div>
                        <div className={"three fields"} >
                            <div className={"field"}>
                                <h4 >
                                    Price/Night
                                    <div className="ui right labeled input">
                                        <label htmlFor="amount" className="ui label">$</label>
                                        <input type="text" placeholder="Amount" id="amount"/>
                                    </div>
                                </h4>

                            </div>

                            <div className={"field"}>
                                <label>Capacity</label>
                                <select className="ui fluid dropdown">
                                    <option value="">Choose</option>
                                    <option value="FP">Single</option>
                                    {/*<option value="QB">Quebec</option>*/}
                                </select>
                            </div>

                            <div className={"field"}>
                                <label>Rooms</label>
                                <div className="ui right labeled input">
                                    <input type="number" placeholder="Number" id="rooms"/>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>

                <form className="ui form">
                    <div>
                        <div className={"two fields"} >
                            <div className={"field"}>
                                <h4 className="ui left floated header">
                                    Check In
                                    <input type={"date"} id={"startDate"}/>
                                </h4>
                            </div>

                            <div className={"field"}>
                                <h4 className="ui right floated header">
                                    Check Out
                                    <input type={"date"} id={"endDate"}/>
                                </h4>
                            </div>
                        </div>

                    </div>
                </form>

                <form className="ui form">
                    <div className={"field"}>
                        <label>Location</label>
                        <select className="ui fluid dropdown">
                            <option value="">Choose</option>
                            <option value="ON">Ontario</option>
                            <option value="QB">Quebec</option>
                            <option value="SK">Saskatoon</option>
                            <option value="MB">Manitoba</option>
                        </select>
                    </div>
                </form>
                <br/>
                <div >
                    <input className={"ui button right floated"} type={"submit"} tabIndex="0" value={"Search"} onClick={this.sendData}/>
                </div>
            </div>
        )
    }
}

export default SearchForm