import React, { Component } from 'react';
import '../../styles/css/temp.css';

class Message extends Component {

  render() {
    const { chat } = this.props;
    return (
      <div>
        <div>{ chat.user }: { chat.message }</div>
      </div>
    );
  }
};

export default Message;
