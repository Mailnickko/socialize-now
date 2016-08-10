import React, { Component } from 'react';
import '../../styles/css/temp.css';
import PollingBoard from '../containers/VoteBoard';
import PollingControlBoard from '../presentational/Polling_ControlBoard';
import io from 'socket.io-client';

//think of this as simply a wrapper for the Nominations page
class Polling extends Component {
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

  // This page will contain components for the chat feature when we get around to it
  render() {
    return (
      <div>
        <PollingBoard />
        <PollingControlBoard />
      </div>
    );
  }
};

export default Polling;
