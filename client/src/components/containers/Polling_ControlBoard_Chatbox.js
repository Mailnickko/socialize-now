import React, { Component } from 'react';
import '../../styles/css/temp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import Message from '../presentational/Polling_ControlBoard_Message';
import UserStatus from '../presentational/Polling_ControlBoard_UserStatus';
import io from 'socket.io-client';

class Chatbox extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: ''
    };
    this.onMessageSend = this.onMessageSend.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  componentWillMount() {
    this.props.grabUserInfo();

    this.socket = io();

    this.socket.on('connect', () => {
      this.socket.emit('join', { eventId: this.props.event._id, name: this.props.userInfo.name });

      this.getMessages();

      this.props.getParticipants(this.props.event.users);

      this.socket.on('message', () => {
        this.getMessages();
      })

      this.socket.on('userStatus', (users) => {
        this.props.getUserStatus(users);
        this.props.getParticipants(this.props.event.users);
      })

      this.socket.on('disconnect', () => {
        console.log('Disconnected!');
      });
    });
  }

  componentWillUnmount() {
    this.socket.emit('leave', { eventId: this.props.event._id, name: this.props.userInfo.name });
    this.socket.disconnect();
  }



  getMessages(){
    this.props.getMessages(this.props.event._id);
    let scroll = document.getElementsByClassName('messages')[0];
    scroll.scrollTop = scroll.scrollHeight;
    setTimeout(function(){
      scroll.scrollTop = scroll.scrollHeight;
    }, 500);
  }

  onMessageChange(e){
    event.stopPropagation();
    this.setState({ message: e.target.value });
  }

  onMessageSend(e){
    e.preventDefault();
    if(this.state.message){
      this.props.sendMessage(this.props.userInfo.name, this.state.message, this.props.event._id)
      this.setState({ message: '' })
    }
  }

  render() {
    return (
      <div className="controlBoardContainer">
        <div className="voterStatusContainer">
          {this.props.userStatus.map((participant, i) =>
            <UserStatus
              key={i}
              participant={participant}
            />
          )}
        </div>
        <div className="chatbox">
          <div className="messages">
            {this.props.chat.map((message, i) =>
              <Message
                key={i}
                message={message}
              />
            )}
          </div>
          <form onSubmit={this.onMessageSend}>
              <input
                className="textBox"
                value={this.state.message}
                onChange={this.onMessageChange}
              />
              <button
                type="submit"
                label="Send"
              >Send!</button>
          </form>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    chat: state.chat,
    event: state.event,
    userInfo: state.userInfo,
    participants: state.participants,
    userStatus: state.userStatus
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);
