import React, { Component, PropTypes } from 'react';
import '../../styles/css/temp.css';

class Message extends Component {

  static propTypes = {
    message: PropTypes.object.isRequired
  }

  render() {
    const { message } = this.props;
    return (
      <div>
        <h3>{ `${message.username}: ${message.message}` }</h3>
      </div>
    );
  }
};

export default Message;
