import React, { Component, PropTypes } from 'react';
import '../../styles/css/login.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/actionCreators';
import { browserHistory } from 'react-router';

class Login extends Component {

  static propTypes = {
    userLoginSuccess: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    // init Auth0 Lock
      // my Auth0 clientID (probably want to store this somewhere else later)
    this.handleLogin = this.handleLogin.bind(this);
    this.redirect = this.redirect.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.lock = new Auth0Lock(/*Client ID*/'9h1CgT5VjsXoUOAfk6d4RAj5XC0EO8An', /*Client Domain*/'socalizehr.auth0.com');
    // this.lock = new Auth0Lock(
    //   'gMnBYSSW30F51nJTviRTZamySvbJqR54',
    //   'nickko.auth0.com'
    // );
  }

  componentDidUpdate(){
    this.checkAuth();
  }

  checkAuth() {
    if (this.props.auth.isAuthenticated && !window.location.search) {
        this.redirect('/dashboard');
    } else if (this.props.auth.isAuthenticated && window.location.search){
      let pollingId = window.location.search.slice(-24);
      this.redirect(`/polling/${pollingId}`);
    }
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
    });
  }

  redirect(param) {
    browserHistory.push(param);
  }

  render() {
    return (
      <div className="loginContainer">
        <div className="loginContent">
          <div className="landingTitleContainer">
            <div className="landingLogo">SN</div>
            <div className="landingTitle">Socialize Now!</div>
          </div>
          <div className="signin">
            <div className="loginInfo">We know how hard it is to decide something to do as a group. <br/><br/> Why not let us help and </div>
            <button
              onClick={this.handleLogin}
              className="signinBtn">
              Socialize Now
            </button>
          </div>
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
