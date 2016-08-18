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
    e.target.inviteUser.value = '';
    e.preventDefault();
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
            <input type="email" name="inviteUser" />
            <button>Invite</button>
          </form>
          <h2>Voting Participants</h2>
          <ParticipantsBoard />
          <div className="emailFriends">
            <form onSubmit={this.inviteUser.bind(this)}>
              <h2>Invite Friends</h2>
              <input type="text" name="invitedUsers" />
              <button>Invite</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Lobby;
