import React, { Component } from 'react';
import '../../styles/css/polling.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import PollingList from '../presentational/PollingList';
import WinningResult from '../presentational/WinningResult';
import Lobby from '../presentational/Lobby';
import io from 'socket.io-client';

class VoteBoard extends Component {

  constructor(props) {
    super(props);
    this.setEndVote = this.setEndVote.bind(this);
    this.addVote = this.addVote.bind(this);
    this.removeVote = this.removeVote.bind(this);
  }

  componentWillMount() {
    this.props.getEvent(this.props.pollId);
    this.socket = io();
    this.socket.on('connect', () => {
      console.log("sockets connected");

      this.socket.on('updateVoteStatus', () => {
        this.props.getEvent(this.props.pollId);
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected!');
      });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  addVote(index, eventId) {
    this.props.increaseVote(index, eventId);
  }

  removeVote(index, eventId) {
    this.props.decreaseVote(index, eventId);
  }

  setStartVote(eventId) {
    //fire off an action creator would likely hold the id of this given event
    this.props.startVote(eventId);
  }
  inviteUser(userId, email) {
    this.props.inviteUser(userId, email);
  }

  setEndVote(eventId) {
    //currently determining winner from dummy nominees obj, will likely have to update once we get actual suggestions
    let winningEvent = this.props.nominees.sort(function(a,b) {
      return b.netVotes - a.netVotes;
    })[0];
    // this.props.setWinningResult(winningEvent, eventId);
    this.props.endVote(winningEvent, eventId)
  }

  // Do this to reuse the nominations board component
    //Will probably have to refactor to render via external methods for modularity
  render() {
    if (this.props.event.isVoting && !this.props.event.voteCompleted) {
      return (
        //Would have to change to include commitments
        <div className="votefieldContainer">
          <div className="votingBoard">
            <div className="voteboardContent">
              <div className="nominationContainer">
                {this.props.nominees.map((nominee, i) =>
                  <PollingList
                    key={i}
                    index={i}
                    nominee={nominee}
                    addVote={this.addVote}
                    removeVote={this.removeVote}
                    eventId={this.props.pollId}
                  />
                )}
              </div>
            </div>
            <div>
              <button onClick={ () => this.setEndVote(this.props.pollId) }>Stop the Vote</button>
            </div>
          </div>
        </div>
      );
    } else if (this.props.event.isVoting && this.props.event.voteCompleted) {
      return (
        <div className="votefieldContainer">
          <WinningResult winner={this.props.event.choice}/>
        </div>
      );
    } else {
        // Passing down startVote function
      return (
        <div className="votefieldContainer">
          <Lobby
            event={this.props.event}
            eventId={this.props.pollId}
            startVote={this.setStartVote.bind(this)}
            inviteUser={this.inviteUser.bind(this)} />
        </div>
      );
    }
  }
};

function mapStateToProps(state) {
  return {
    //would hold data for nominated events
    //would also hold data for a given event
    nominees: state.nominees,
    voteStatus: state.voteStatus,
    event: state.event
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteBoard);
