import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import EventDetails from './BulletinBoard_EventDetails';
import PinnedMessages from './BulletinBoard_PinnedMessages';

class BulletinBoard extends Component {

  static propTypes = {
    winner: PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <EventDetails winner={this.props.winner} />
        <PinnedMessages winner={this.props.winner} />
      </div>
    );
  }
};

export default BulletinBoard;
