import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import '../../styles/css/temp.css';
import Moment from 'moment';

class Message extends Component {

  static propTypes = {
    message: PropTypes.object.isRequired
  }

  checkPinned(){
    const { message } = this.props;
    if(message.pinned){
      return (
        <FontAwesome name='star' className="pinStar" style={{"color": "yellow"}} onClick={() => this.props.pinMessage(message._id, this.props.eventId)}/>
      )
    } else {
      return (
        <FontAwesome name='star' className="pinStar" style={{"color": "white"}} onClick={() => this.props.pinMessage(message._id, this.props.eventId)}/>
      )
    }
  }

  giphyCheck(){
    const { message } = this.props;
    if(message.message.slice(-4) === '.gif'){
      return (
        <div>
          <img src={ message. message } alt=""/>
          <img className="giphy" src="http://i.imgur.com/s3gLgiO.png"/>
        </div>
      )
    } else {
      return (
        <div className="chatMessage">{ message.message }</div>
      )
    }
  }

  render() {
    const { message } = this.props;

    if(this.props.messageNum % 2 === 0){
      return (
        <div className="messageBox animated bounce">
          <div className="messageContent">
            <div className="name">{ message.username } { this.checkPinned() }</div>
            { this.giphyCheck() }
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
            <div className="name">{ message.username } { this.checkPinned() }</div>
            { this.giphyCheck() }
            <div className="chatTime">{ Moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a') }</div>
          </div>
        </div>
      );
    }
  }
};

export default Message;
