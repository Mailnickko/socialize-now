import React, { Component } from 'react';
import '../../styles/css/temp.css';
import { Link } from 'react-router';

class Login extends Component {
  render() {
    return (
      <div>
        <div className="center">
          <h1>Landing Page Header</h1>
          <Link to="/dashboard"><button>Signin/Register</button></Link>
        </div>
      </div>
    );
  }
};

export default Login;
