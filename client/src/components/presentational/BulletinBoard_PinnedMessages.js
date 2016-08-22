import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

class PinnedMessages extends Component {

  render() {
    return (
      <div className="winner">
        <div className="pinnedMessages">
          <h1>Pinned Messages</h1>
        </div>
      </div>
    );
  }
};

export default PinnedMessages;
