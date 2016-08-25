import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import EventDetails from './BulletinBoard_EventDetails';
import PinnedMessages from './BulletinBoard_PinnedMessages';
import ParticipantList from './ParticipantList';

class BulletinBoard extends Component {

  static propTypes = {
    winner: PropTypes.object.isRequired,
    pinnedMessages: PropTypes.array
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
                    <div className="togglePinned" onClick={ () => this.props.togglePin() }><FontAwesome name='thumb-tack'/> Toggle Pinned</div>
                  </div>
                  <div>
                    <div className="boardEmail"><FontAwesome name='envelope-o'/> Invite via Email</div>
                  </div>
                  <div>
                    <div className="boardLink"><FontAwesome name='clipboard'/> Copy invite link</div>
                  </div>
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
