import React, { Component } from 'react';
import '../../styles/css/polling.css';
import VoteBoard from '../containers/Polling_ControlBoard_VoteBoard';
import Chatbox from '../containers/Polling_ControlBoard_Chatbox';

class ControlBoard extends Component {

  render() {
    return (
      <div className="controlContainer">
        <VoteBoard />
        <Chatbox />
      </div>
    );
  }
};

export default ControlBoard;
