import React, { Component } from 'react';
import '../../styles/css/temp.css';
import VoteBoard from '../containers/Polling_ControlBoard_VoteBoard';
import Chatbox from '../containers/Polling_ControlBoard_Chatbox';

class ControlBoard extends Component {

  render() {
    return (
      <div>
        <VoteBoard />
        <Chatbox />
      </div>
    );
  }
};

export default ControlBoard;
