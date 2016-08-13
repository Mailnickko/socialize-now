import React, { Component } from 'react';
import '../../styles/css/login.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import { browserHistory } from 'react-router';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    // init Auth0 Lock
      // my Auth0 clientID (probably want to store this somewhere else later)
    this.handleLogin = this.handleLogin.bind(this);
    this.redirect = this.redirect.bind(this);
    this.lock = new Auth0Lock('9h1CgT5VjsXoUOAfk6d4RAj5XC0EO8An', 'socalizehr.auth0.com');
  }

  handleLogin() {
    this.lock.show({ gravatar: false }, (err, profile, token) => {
      if (err) {
        this.props.lockError(err);
      }
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', token);
      this.props.userLoginSuccess(profile, token);
      if (this.props.auth.isAuthenticated) {
        this.redirect();
      }
    });
  }

  redirect() {
    browserHistory.push('/dashboard');
  }

  render() {
      if (!this.props.auth.isAuthenticated) {
        return (
          <div>
            <div className="loginContainer">
              <h1 className="landingTitle">Socialize Now!</h1>
              <button
                onClick={this.handleLogin}
                className="signin">
                Signin / Register
              </button>
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <h1 className="landingTitle">Logged in!</h1>
          </div>
        )
      }
  }
};

//Todo

// finish promoting to container

// make auth reducer

// tie in auth

function mapStateToProps(state) {
    //Not sure what kind of error we'd return here
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
