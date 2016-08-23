import React, { Component, PropTypes } from 'react';
import '../../styles/css/temp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import Message from '../presentational/Polling_ControlBoard_Message';
import UserStatus from '../presentational/Polling_ControlBoard_UserStatus';
import io from 'socket.io-client';

class Chatbox extends Component {

  static propTypes = {
    grabUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
    startVote: PropTypes.func.isRequired,
    getUserStatus: PropTypes.func.isRequired,
    getParticipants: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    userStatus: PropTypes.array.isRequired,
    event: PropTypes.object.isRequired,
    chat: PropTypes.array.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
      message: ''
    };
    this.onMessageSend = this.onMessageSend.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.getPinnedMessages = this.getPinnedMessages.bind(this);
  }

  componentWillMount() {
    this.props.grabUserInfo();

    this.socket = io();

    this.socket.on('connect', () => {
      this.socket.emit('join', { eventId: this.props.event._id, name: this.props.userInfo.name });

      this.getMessages();

      this.props.getParticipants(this.props.event._id);

      this.socket.on('message', () => {
        this.getMessages();
      })

      this.getPinnedMessages();

      this.socket.on('pinnedMessage', () => {
        this.getPinnedMessages();
      })

      this.socket.on('userStatus', (users) => {
        this.props.getUserStatus(users);
        this.props.getParticipants(this.props.event._id);
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

  startVote(e, eventId) {
    e.preventDefault();
    this.props.startVote(eventId);
  }

  getMessages(){
    this.props.getMessages(this.props.event._id);
    let scroll = document.getElementsByClassName('messages')[0];
    scroll.scrollTop = scroll.scrollHeight;
    setTimeout(function(){
      scroll.scrollTop = scroll.scrollHeight;
    }, 500);
  }

  getPinnedMessages(){
    this.props.getPinnedMessages(this.props.event._id);
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
        <div className="chatbox">
        <div className="chatHeader">
          <div className="socializeNowLogo">
            <div className="SN">SN</div>
            <div className="SNTag">Socialize Now</div>
          </div>
          <div className="chatTitle">Chat</div>
        </div>
          <div className="messages">
            {this.props.chat.map((message, i) =>
              <Message
                key={i}
                messageNum={i}
                message={message}
              />
            )}
          </div>
          <div className="textBoxContainer">
            <form
              onSubmit={this.onMessageSend}
              className="chatForm"
            >
            <input
              className="textBox"
              value={this.state.message}
              onChange={this.onMessageChange}
            />
            <button
              type="submit"
              label="Send"
              className="chatButton"
            >Send!</button>
            </form>
          </div>
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
