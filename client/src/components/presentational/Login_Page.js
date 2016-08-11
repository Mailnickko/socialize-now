import React, { Component } from 'react';
import '../../styles/css/login.css';
import { Link } from 'react-router';

class Login extends Component {
  render() {
    return (
      <div>
        <div className="loginContainer">
          <h1 className="landingTitle">Socialize!</h1>
          <Link to="/dashboard"><button className="signin">Signin / Register</button></Link>
        </div>
      </div>
    );
  }
};

export default Login;
