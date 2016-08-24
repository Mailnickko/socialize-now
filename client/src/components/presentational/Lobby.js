import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import ParticipantsBoard from '../containers/ParticipantsBoard';
import FontAwesome from 'react-fontawesome';

class Lobby extends Component {

  static propTypes = {
    inviteUser: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    startVote: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.startVote = this.startVote.bind(this);
    this.inviteUser = this.inviteUser.bind(this);
  }

  inviteUser() {
    let email = prompt("Enter your friend's email");
    this.props.inviteUser(this.props.event.creator, email, this.props.event._id);
  }

  startVote(e, eventId) {
    e.preventDefault();
    this.props.startVote(eventId);
  }

  hostCheck(){
    if(this.props.userInfo.userId === this.props.event.creator){
      return (
        <div className="startVote" onClick={ (e) => this.startVote(e, this.props.event._id) }>
          <FontAwesome name='rocket' size='5x' />
          <div className="emailText">Start Vote!</div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="lobby">
        <div className="lobbyTitle">{this.props.event.name}</div>
        <ParticipantsBoard />
        <div className="lobbyControls animated fadeIn">
          <div className="emailInvite" onClick={ () => this.inviteUser() }>
            <FontAwesome name='envelope-o' size='5x' />
            <div className="emailText">Invite via Email</div>
          </div>
          { this.hostCheck() }
          <div className="copyInvite">
            <FontAwesome name='clipboard' size='5x' />
            <div className="emailText">Copy invite link</div>
          </div>
        </div>
      </div>
    );
  }
};

export default Lobby;
