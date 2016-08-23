import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import PollingBoard from '../containers/VoteBoard';
import Chatbox from '../containers/Polling_ControlBoard_Chatbox';

//think of this as simply a wrapper for the Nominations page
class Polling extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className="pollingContainer">
        <Chatbox />
        <PollingBoard pollId={ this.props.params.pollId }/>
      </div>
    );
  }
};

export default Polling;
