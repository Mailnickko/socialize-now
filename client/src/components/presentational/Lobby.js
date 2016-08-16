import React, { Component } from 'react';
import '../../styles/css/polling.css';
import ParticipantsBoard from '../containers/ParticipantsBoard';

class Lobby extends Component {

  sendInvites(e) {
    e.preventDefault();
    let invitees = {
      invitees: e.target.invitedUsers.value.split(',')
    };
    //Send an email to these invitees
    // console.log(invitees);
  }

  startVote(e) {
    e.preventDefault();
    this.props.startVote();
  }


  render() {
    return (
      <div className="lobby">
          <div className="participantContainer">
          <h1>{this.props.event.name}</h1>
          <form onSubmit={this.sendInvites.bind(this)}>
          <h2>Invite Friends</h2>
          <input type="text" name="invitedUsers" />
            <button>Invite</button>
            <h2>Voting Participants</h2>
            <ParticipantsBoard />
          </form>
          <button className="startBtn" onClick={this.startVote.bind(this)}>Begin Voting!</button>
        </div>
      </div>
    );
  }
};

export default Lobby;
