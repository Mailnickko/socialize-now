import React, { Component } from 'react';
import '../../styles/css/temp.css';
import ParticipantsBoard from '../containers/ParticipantsBoard';

class Lobby extends Component {

  render() {
    return (
      <div>
        <h2>Voting Participants</h2>
        <ParticipantsBoard />
      </div>
    );
  }
}

export default Lobby;