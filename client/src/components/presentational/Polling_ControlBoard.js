import React, { Component } from 'react';
import '../../styles/css/polling.css';
import Chatbox from '../containers/Polling_ControlBoard_Chatbox';

class ControlBoard extends Component {

  render() {
    return (
      <div className="controlContainer">
        <Chatbox />
      </div>
    );
  }
};

export default ControlBoard;
