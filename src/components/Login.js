import React, {Component} from 'react';
import {firebaseApp} from '../configFirebase'

class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {
                message: ''
            }
        }
    }

    login = ()=> {

        const {email, password} = this.state;
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .catch(error=> this.setState({error}))
    }
    render() {
        return (
            <div className="container" style={{margin: '5%'}}>
                <div>
                    <input type="text"
                           placeholder="Enter Email"
                           style={{margin: '10px'}}
                           onChange={({target})=>this.setState({email: target.value})}
                    />
                    <input type="password"
                           placeholder="Enter Password"
                           style={{margin: '10px'}}
                           onChange={({target})=>this.setState({password: target.value})}
                    />


                    <button className="btn" onClick={this.login}>Login</button>

                </div>
            </div>


        )


    }


}

export default Login;