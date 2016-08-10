import React, { Component } from 'react';
import '../../styles/css/temp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import Message from '../presentational/Polling_ControlBoard_Message';
import io from 'socket.io-client';

class Chatbox extends Component {
  constructor(props){
    super(props);
    this.state = { message: '' };
    this.onMessageSend = this.onMessageSend.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  componentWillMount() {
    this.socket = io();
    this.socket.on('connect', () => {
      this.getMessages();

      this.socket.on('message', () => {
        this.getMessages();
      })

      this.socket.on('disconnect', () => {
        console.log('Disconnected!');
      });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  getMessages(){
    this.props.getMessages('666');
  }

  onMessageChange(e){
    event.stopPropagation();
    this.setState({ message: e.target.value });
  }

  onMessageSend(e){
    e.preventDefault();
    if(this.state.message){
      this.props.sendMessage('TestBuddy', this.state.message, '666')
      this.setState({ message: '' })
    }
  }

  render() {
    return (
      <div className="chatbox">
        {this.props.chat.map((message, i) =>
          <Message
            key={i}
            message={message}
          />
        )}
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
    );
  }
};

function mapStateToProps(state) {
  return {
    chat: state.chat
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);
