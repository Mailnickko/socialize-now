import React, { Component } from 'react';
import '../../styles/css/polling.css';
import ParticipantsBoard from '../containers/ParticipantsBoard';

class Lobby extends Component {

  constructor(props) {
    super(props);
    this.startVote = this.startVote.bind(this);
    this.inviteUser = this.inviteUser.bind(this);
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
    return (
      <div className="lobby">
          <div className="participantContainer">
          <h1>{this.props.event.name}</h1>

          <div className="participantHolder">
            <ParticipantsBoard />
          </div>
          <div className="emailHolder">
            <div className="emailFriends">
              <form onSubmit={ this.inviteUser }>
                Invite Friends: <input type="text" name="invitedUsers" placeholder="friends@email.com"/><button>Invite</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Lobby;
