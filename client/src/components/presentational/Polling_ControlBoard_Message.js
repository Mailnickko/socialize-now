import React, { Component, PropTypes } from 'react';
import '../../styles/css/temp.css';

class Message extends Component {

  static propTypes = {
    message: PropTypes.object.isRequired
  }

  render() {
    const { message } = this.props;
    if(this.props.messageNum % 2 === 0){
      return (
        <div className="messageBox">
          <div className="messageContent">
            <div className="name">{ message.username }</div>
            <div className="chatMessage">{ message.message }</div>
            <div className="chatTime">{ message.time }</div>
          </div>
          <img src={ message.profilePic } alt="" className="chatProfile"/>
        </div>
      );
    } else {
      return (
        <div className="messageBox">
          <img src={ message.profilePic } alt="" className="chatProfile"/>
          <div className="messageContent">
            <div className="name">{ message.username }</div>
            <div className="chatMessage">{ message.message }</div>
            <div className="chatTime">{ message.time }</div>
          </div>
        </div>
      );
    }
  }
};

export default Message;
