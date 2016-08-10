import React, { Component } from 'react';
import '../../styles/css/temp.css';
import ParticipantsBoard from '../containers/ParticipantsBoard';

class Lobby extends Component {

  sendInvites(e) {
    e.preventDefault();
    let invitees = {
      invitees: e.target.invitedUsers.value.split(',')
    };
    //Send an email to these invitees
    console.log(invitees);
  }



  render() {
    return (
      <div>
        <h2>Invite Friends</h2>
        <form onSubmit={this.sendInvites.bind(this)}>
          <label>Invited Users:</label>
          <input type="text" name="invitedUsers" />
          <button>Invite</button>
        </form>

        <button onClick={this.startVote.bind(this)}>Begin Voting!</button>

        <h2>Voting Participants</h2>
        <ParticipantsBoard />
      </div>
    );
  }
}

export default Lobby;
