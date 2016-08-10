import React, { Component } from 'react';
import '../../styles/css/polling.css';
import PollingBoard from '../containers/VoteBoard';
import PollingControlBoard from '../presentational/Polling_ControlBoard';

//think of this as simply a wrapper for the Nominations page
class Polling extends Component {
  // This page will contain components for the chat feature when we get around to it
  render() {
    return (
      <div className="pollingContainer">
        <PollingBoard />
        <PollingControlBoard />
      </div>
    );
  }
};

export default Polling;
