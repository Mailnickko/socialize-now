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
    this.lock = new Auth0Lock(/*Client ID*/'9h1CgT5VjsXoUOAfk6d4RAj5XC0EO8An', /*Client Domain*/'socalizehr.auth0.com');
    this.handleLogin = this.handleLogin.bind(this);
    this.redirect = this.redirect.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
  }

  componentDidUpdate() {
    this.checkAuth();
  }

  // Input: None
  // Output: None => Check if User is Auth'd and redirect
  checkAuth() {
    if (this.props.auth.isAuthenticated){
      let path = window.location.search;
      if (path && path.indexOf("polling") > 0) {
        let pollingId = window.location.search.slice(-24);
        this.redirect(`/polling/${pollingId}`);
      }else {
        this.redirect('/dashboard');
      }
    }
  }

  // Input: None
  // Output: None => Trigger Action Creator to set user isAuthenticated to true
  handleLogin() {
    this.lock.show( { gravatar: false }, (err, profile, token) => {
      if (err) {
        this.props.lockError(err); //TODO: Check this out
      }
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', token);
      this.props.userLoginSuccess(profile, token);
    });
  }

  // Input: @param => String => Redirect destination
  // Output: None => Check if User is Auth'd and redirect
  redirect(param) {
    browserHistory.push(param);
  }

  render() {
    return (
      <div className="loginContainer">
        <div className="loginContent">
          <div className="landingTitleContainer">
            <div className="landingLogo animated zoomIn">SN</div>
            <div className="landingTitle animated lightSpeedIn">Socialize Now!</div>
          </div>
          <div className="signin animated fadeIn">
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
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
