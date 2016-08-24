import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import '../../styles/css/temp.css';
import Moment from 'moment';

class Message extends Component {

  static propTypes = {
    message: PropTypes.object.isRequired
  }

  render() {
    const { message } = this.props;
    if(this.props.messageNum % 2 === 0){
      return (
        <div className="messageBox animated bounce">
          <div className="messageContent">
            <div className="name">{ message.username } <FontAwesome name='star' className="pinStar"/></div>
            <div className="chatMessage">{ message.message }</div>
            <div className="chatTime">{ Moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a') }</div>
          </div>
          <img src={ message.profilePic } alt="" className="chatProfile"/>
        </div>
      );
    } else {
      return (
        <div className="messageBox animated bounce">
          <img src={ message.profilePic } alt="" className="chatProfile"/>
          <div className="messageContent">
            <div className="name">{ message.username } <FontAwesome name='star' className="pinStar"/></div>
            <div className="chatMessage">{ message.message }</div>
            <div className="chatTime">{ Moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a') }</div>
          </div>
        </div>
      );
    }
  }
};

export default Message;
