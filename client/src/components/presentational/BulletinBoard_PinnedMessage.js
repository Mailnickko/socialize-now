import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

class PinnedMessages extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pinnedMessage">
        <div className="pinnedMessageContent">
          <h1>Pinned Messages</h1>
          <p> Don't forget your towel </p>
          <p> Parking is $10 dollars and can be found at this spot www.parking.com</p>

        </div>
      </div>
    );
  }
};

export default PinnedMessages;
