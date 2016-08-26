import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import EventDetails from './BulletinBoard_EventDetails';
import PinnedMessages from './BulletinBoard_PinnedMessages';
import ParticipantList from './ParticipantList';
import CopyToClipboard from 'react-copy-to-clipboard';

class BulletinBoard extends Component {

  static propTypes = {
    winner: PropTypes.object.isRequired,
    pinnedMessages: PropTypes.array
  }

  // Input: None
  // Output: None => Trigger action creator to send email to invitee
  inviteUser() {
    let email = prompt("Enter your friend's email");
    this.props.inviteUser(this.props.event.creator, email, this.props.event._id);
  }

  // Input: None
  // Output: None => Trigger action creator to set message to pin
  //              => Retrieve fresh data from DB
  togglePinned() {
    this.props.getPinnedMessages(this.props.event._id);
    this.props.togglePin();
  }

  render() {
    const { winner, pinnedMessages } = this.props;
    return (
      <div>
        <div className="boardContainer">
            <div className="bottomBoard">
              <div className="boardLeft">
                <EventDetails winner={ winner } />
                <div className="boardButtons animated fadeIn">
                  <div>
                    <div className="togglePinned" onClick={ () => this.togglePinned() }><FontAwesome name='thumb-tack'/> Toggle Pinned</div>
                  </div>
                  <div>
                    <div className="boardEmail" onClick={ () => this.inviteUser() }><FontAwesome name='envelope-o'/> Invite via Email</div>
                  </div>
                  <CopyToClipboard text={location.href}
                    onCopy={() => this.setState({copied: true})}>
                    <div>
                      <div className="boardLink"><FontAwesome name='clipboard'/> Copy invite link</div>
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
              <div className="boardRight">
                <div className="boardUserListContainer">
                  {this.props.participants.map((participant, i) =>
                    <ParticipantList
                      key={i}
                      participant={participant}
                      isHost={this.props.isHost}
                    />
                  )}
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
};

export default BulletinBoard;
