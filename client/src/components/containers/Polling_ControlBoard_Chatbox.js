import React, { Component, PropTypes } from 'react';
import '../../styles/css/temp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import Message from '../presentational/Polling_ControlBoard_Message';
import UserStatus from '../presentational/Polling_ControlBoard_UserStatus';
import io from 'socket.io-client';
import { Link } from 'react-router';

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
    this.pinMessage = this.pinMessage.bind(this);
  }

  componentWillMount() {
    this.props.grabUserInfo();

    this.socket = io();

    this.socket.on('connect', () => {
      this.socket.emit('join', { eventId: this.props.event._id, name: this.props.userInfo.name, userId: this.props.userInfo.userId, picture: this.props.userInfo.picture });

      this.getMessages();

      this.props.getParticipants(this.props.event._id);

      this.socket.on('message', () => {
        this.getMessages();
        console.log('hi');
      })

      this.socket.on('allvote', () => {
        this.setEndVote(this.props.event._id);
      });

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
    this.socket.disconnect();
  }

  pinMessage(messageId){
    this.socket.emit('pinned', { messageId });
    this.getMessages();
  }

  startVote(e, eventId) {
    e.preventDefault();
    this.props.startVote(eventId);
  }

  setEndVote(eventId) {
    let winningEvent = this.props.event.choices.sort(function(a,b) {
      return b.netVotes - a.netVotes;
    })[0];
    this.props.endVote(winningEvent, eventId)
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
      this.props.sendMessage(this.props.userInfo.name, this.state.message, this.props.event._id, this.props.userInfo.picture)
      this.setState({ message: '' })
    }
  }

  isPinned(){
    if(this.props.pinnedStatus){
      return this.props.pinnedMessages.map((message, i) =>
              <Message
                key={i}
                messageNum={i}
                message={message}
                pinMessage={this.pinMessage}
                eventId={this.props.event._id}
              />
            )
    } else {
      return this.props.chat.map((message, i) =>
              <Message
                key={i}
                messageNum={i}
                message={message}
                pinMessage={this.pinMessage}
                eventId={this.props.event._id}
              />
            )
    }
  }

  render() {
    return (
      <div className="controlBoardContainer">
        <div className="chatbox">
        <div className="chatHeader">
        <Link className="linkHome" to="/dashboard">
          <div className="socializeNowLogo animated fadeInDown">
            <div className="SN">SN</div>
            <div className="SNTag">Socialize Now</div>
          </div>
        </Link>
        <div className="chatTitle">Chat</div>
        </div>
          <div className="messages">
            {this.isPinned()}
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
    userStatus: state.userStatus,
    pinnedStatus: state.pinnedStatus,
    pinnedMessages: state.pinnedMessages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);
