import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import PinnedMessage from './BulletinBoard_PinnedMessage';

class PinnedMessages extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pinnedMessages">
        <div className="pinnedMessagesContent">
          <h3>Pinned Messages </h3>
          <div>
            <PinnedMessage message="Don't forget to bring your towels" />
            <PinnedMessage message="Parking is 5 bucks, instructions are at www.parkinghere.com" />
            <PinnedMessage message="Does anybody have a portable BBQ?" />
            <PinnedMessage message="Chef Boyardee needs a ride can anybody pick him up at 2938 Ravioli Rd" />
          </div>
        </div>
      </div>
    );
  }
};

export default PinnedMessages;
