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
                <div>
                    Submit: <input  className={"btn btn-primary"} type={"submit"} id={"submit"} value={"Submit"}  onClick={()=> props.func(props.service)}/>
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
                <form>
                {/*<TextField*/}
                {/*    id={"sin"}*/}
                {/*    label={"SIN"}*/}
                {/*    type={"text"}*/}
                {/*    className={classes.textField}*/}
                {/*    onChange={this.handleChange('name')}*/}
                {/*    margin={"normal"}*/}
                {/*    variant={"outlined"}*/}
                {/*/>*/}

                {/*<TextField*/}
                {/*    id={"sin"}*/}
                {/*    label={"SIN"}*/}
                {/*    type={"text"}*/}
                {/*    className={classes.textField}*/}
                {/*    onChange={this.handleChange('name')}*/}
                {/*    margin={"normal"}*/}
                {/*    variant={"outlined"}*/}
                {/*/>*/}

                {/*    <TextField*/}
                {/*        id={"sin"}*/}
                {/*        label={"SIN"}*/}
                {/*        type={"text"}*/}
                {/*        className={classes.textField}*/}
                {/*        onChange={this.handleChange('name')}*/}
                {/*        margin={"normal"}*/}
                {/*        variant={"outlined"}*/}
                {/*    />*/}
                {/*    <TextField*/}
                {/*        id={"sin"}*/}
                {/*        label={"SIN"}*/}
                {/*        type={"text"}*/}
                {/*        className={classes.textField}*/}
                {/*        onChange={this.handleChange('name')}*/}
                {/*        margin={"normal"}*/}
                {/*        variant={"outlined"}*/}
                {/*    />*/}
                {/*    <TextField*/}
                {/*        id={"sin"}*/}
                {/*        label={"SIN"}*/}
                {/*        type={"text"}*/}
                {/*        className={classes.textField}*/}
                {/*        onChange={this.handleChange('name')}*/}
                {/*        margin={"normal"}*/}
                {/*        variant={"outlined"}*/}
                {/*    />*/}

                <div>
                        SIN: <input type={"text"} name={"sin"} />
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
                </form>
            </div>
        )
    }


}

export default CustomerForm;