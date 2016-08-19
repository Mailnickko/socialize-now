import React, { Component } from 'react';
import '../../styles/css/login.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import { browserHistory } from 'react-router';

class Login extends Component {

  constructor(props) {
    super(props);
    // init Auth0 Lock
      // my Auth0 clientID (probably want to store this somewhere else later)
    this.handleLogin = this.handleLogin.bind(this);
    this.redirect = this.redirect.bind(this);
    this.lock = new Auth0Lock(/*Client ID*/'9h1CgT5VjsXoUOAfk6d4RAj5XC0EO8An', /*Client Domain*/'socalizehr.auth0.com');
    // this.lock = new Auth0Lock(
    //   'gMnBYSSW30F51nJTviRTZamySvbJqR54',
    //   'nickko.auth0.com'
    // );
  }

  componentWillMount(){
    // if (this.props.auth.isAuthenticated) {
    //   this.redirect();
    // }
  }

  handleLogin() {
    // show the widget upon clicking the signin button
    this.lock.show( { gravatar: false }, (err, profile, token) => {
      if (err) {
        this.props.lockError(err); //TODO: Check this out
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
    return (
      <div className="loginContainer">
        <div className="loginContent">
          <h1 className="landingTitle">Socialize Now!</h1>
          <button
            onClick={this.handleLogin}
            className="signin">
            Signin / Register
          </button>
        </div>
      </div>
    );
  }
};

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
