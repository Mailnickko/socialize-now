import React, { Component } from 'react';
import '../../styles/css/polling.css';
import ParticipantsBoard from '../containers/ParticipantsBoard';

class Lobby extends Component {

  constructor(props) {
    super(props);
    this.startVote = this.startVote.bind(this);
  }

  inviteUser(e) {
    this.props.inviteUser(this.props.event.creator, e.target.inviteUser.value);
  }

  startVote(e, eventId) {
    e.preventDefault();
    this.props.startVote(eventId);
  }

  render() {
    const { eventId } = this.props;
    return (
      <div className="lobby">
          <div className="participantContainer">
          <h1>{this.props.event.name}</h1>
          <form onSubmit={this.inviteUser.bind(this)}>
            <h2>Invite Friends</h2>
            <input type="text" name="invitedUsers" />
            <button>Invite</button>
          </form>
          <h2>Voting Participants</h2>
          <ParticipantsBoard />
          <button
            className="startBtn"
            onClick={ (e) => this.startVote(e, eventId) }>
            Begin Voting!
          </button>
        </div>
      </div>
    );
  }
};

export default Lobby;
