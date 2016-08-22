import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

class PinnedMessage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pinnedMessage">
        <div className="pinnedMessageContent">
          {this.props.message}
        </div>
      </div>
    );
  }
};

export default PinnedMessage;
