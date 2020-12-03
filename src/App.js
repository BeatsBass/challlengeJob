import React, { Component } from 'react';
import { HashRouter, Route, Link, Redirect } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import { firebaseApp } from './configFirebase';
import MainView from './components/MainView'
import './App.css'


class App extends Component {

  constructor() {
    super();
    this.state = {
      authed: false,
      userid: null,
      email: null
    }
  }


  componentDidMount() {
    this.removeFirebaseEvent = firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true, userid: user.uid, email: user.email })


      } else {
        this.setState({
          authed: false,
        })
      }
    })

  }


  logout = () => {
    firebaseApp.auth().signOut();
  }

  componentWillUnmount() {
    this.removeFirebaseEvent()
  }

  render() {
    return (
      <HashRouter>
        <div className="container">

          <header className='header'>
            <h1>JOB CHALLENGE JOJHAN</h1>
            {<nav>
              <div className="container">

                <ul className="link">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    {this.state.authed
                      ? <button
                        className="btn" onClick={this.logout}>Logout</button>
                      : <span>
                        <Link to="/login" className="login-logout"> Login</Link>
                        <Link to="/register"  className="login-logout">Register</Link>
                      </span>}
                  </li>
                </ul>
              </div>
            </nav>}
          </header>


          {!this.state.authed ? <div className="container"><h3>Please login if you are existing user.</h3>
            <hr />
            <h3> Please register if you are not registered to use the app.</h3>
          </div> : ''}
          <div>
            <Route path='/' render={() => this.state.authed ? <Redirect to='/dashboard' /> : <div></div>} />
            <Route path='/login' render={() => this.state.authed ? <Redirect to='/dashboard' /> : <Login />} />
            <Route path='/dashboard'
              render={() => this.state.authed ?
                <MainView userid={this.state.userid} email={this.state.email} /> :
                <Redirect to='/login' />} />
            <Route path='/register' component={Register} />
          </div>

        </div>
      </HashRouter>
    );
  }
}

export default App;