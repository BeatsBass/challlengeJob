import React, {Component} from 'react';
import {firebaseApp,users} from '../configFirebase'

class Register extends Component {


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


    register = ()=> {
        console.log(this.state);
        const {email, password} = this.state;
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then((user)=> {
                console.log(user)
                const thisUser = users.child(user.uid);
                const userdetail = thisUser.child('userdetail');
                const dataToInsert = {email: user.email, userid: user.uid};
                userdetail.set(dataToInsert)
            })
            .catch(error=> this.setState({error}))


    }


    render() {
        return (
            <div style={{margin: '5%'}}>
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

                    <button
                        className="btn"
                        onClick={this.register}
                    >
                        Register
                    </button>

                    <div>{this.state.error.message}</div>

                </div>
            </div>


        )


    }


}

export default Register ;