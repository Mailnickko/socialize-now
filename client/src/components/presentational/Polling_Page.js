import React, { Component } from 'react';
import '../../styles/css/polling.css';
import PollingBoard from '../containers/VoteBoard';
import PollingControlBoard from '../presentational/Polling_ControlBoard';

//think of this as simply a wrapper for the Nominations page
class Polling extends Component {

  render() {
    return (
      <div className="pollingContainer">
        <PollingBoard pollId={this.props.params.pollId}/>
        <PollingControlBoard />
      </div>
    );
  }
};

export default Polling;
