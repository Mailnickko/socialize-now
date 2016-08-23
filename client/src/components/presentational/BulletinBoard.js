import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import EventDetails from './BulletinBoard_EventDetails';
import PinnedMessages from './BulletinBoard_PinnedMessages';

class BulletinBoard extends Component {

  static propTypes = {
    winner: PropTypes.object.isRequired,
    pinnedMessages: PropTypes.array
  }

  render() {
    const { winner, pinnedMessages } = this.props;
    return (
      <div>
        <EventDetails winner={ winner } />
        <PinnedMessages
          winner={ winner }
          pinnedMessages={ pinnedMessages }
        />
      </div>
    );
  }
};

export default BulletinBoard;
