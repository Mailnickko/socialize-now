import React, { Component } from 'react';
import '../../styles/css/temp.css';
import { Link } from 'react-router';
import io from 'socket.io-client';

class Login extends Component {
  constructor(){
    super();
  }

  componentWillMount() {
    this.socket = io();
    this.socket.on('connect', () => {
      console.log('Connected!');
      this.socket.on('disconnect', () => {
        console.log('Disconnected!');
      });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

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
