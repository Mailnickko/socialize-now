import React, { Component } from 'react';
import '../../styles/css/temp.css';
import VoteBoard from '../containers/Polling_ControlBoard_VoteBoard';

class ControlBoard extends Component {

  render() {
    return (
      <div>
        <VoteBoard />
      </div>
    );
  }
};

export default ControlBoard;
