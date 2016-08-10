import React, { Component } from 'react';
import '../../styles/css/temp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import Message from '../presentational/Polling_ControlBoard_Message';

class Chatbox extends Component {

  render() {
    return (
      <div>
        {this.props.chat.map((chat, i) =>
          <Message
            key={i}
            chat={chat}
          />
        )}
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
