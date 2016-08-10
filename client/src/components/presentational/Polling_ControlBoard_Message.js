import React, { Component } from 'react';
import '../../styles/css/temp.css';

class Message extends Component {

  render() {
    const { message } = this.props;
    return (
      <div>
        <h3>{`${message.username}: ${message.message}`}</h3>
      </div>
    );
  }
};

export default Message;
