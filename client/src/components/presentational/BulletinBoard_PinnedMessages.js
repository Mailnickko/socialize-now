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
          {this.props.pinnedMessages.map( message => <PinnedMessage message={message} />)}
        </div>
      </div>
    );
  }
};

export default PinnedMessages;
