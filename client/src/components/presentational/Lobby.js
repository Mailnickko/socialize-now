import React, { Component } from 'react';
import '../../styles/css/polling.css';
import ParticipantsBoard from '../containers/ParticipantsBoard';

class Lobby extends Component {

  inviteUser(e) {
    this.props.inviteUser(this.props.event.creator, e.target.inviteUser.value);
    e.preventDefault();
    e.target.inviteUser.value = '';
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
          <form onSubmit={this.inviteUser.bind(this)}>
          <h2>Invite a friend with email!</h2>
          <input type="email" name="inviteUser" />
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
