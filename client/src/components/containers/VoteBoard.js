import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import PollingList from '../presentational/PollingList';
import UserStatus from '../presentational/Polling_UserStatus';
import BulletinBoard from '../presentational/BulletinBoard';
import Lobby from '../presentational/Lobby';
import io from 'socket.io-client';
import Slider from 'react-slick'
import FontAwesome from 'react-fontawesome';

class VoteBoard extends Component {

  static propTypes = {
    voteStatus: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired,
    getEvent: PropTypes.func.isRequired,
    increaseVote: PropTypes.func.isRequired,
    decreaseVote: PropTypes.func.isRequired,
    startVote: PropTypes.func.isRequired,
    endVote: PropTypes.func.isRequired,
    inviteUser: PropTypes.func.isRequired,
    pollId: PropTypes.string.isRequired,
    pinnedMessages: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.setEndVote = this.setEndVote.bind(this);
    this.addVote = this.addVote.bind(this);
    this.removeVote = this.removeVote.bind(this);
    this.setStartVote = this.setStartVote.bind(this);
    this.inviteUser = this.inviteUser.bind(this);
  }

  componentWillMount() {
    this.props.getEvent(this.props.pollId);
    this.socket = io();
    this.socket.on('connect', () => {
      console.log("Sockets Connected");

      this.socket.on('updateVoteStatus', () => {
        this.props.getEvent(this.props.pollId);
      });

      this.socket.on('allvote', (stuff) => {
        console.log("All votes In");
      });

      this.socket.on('disconnect', () => {
        console.log('Sockets Disconnected!');
      });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  // Input: @eventId => String => Id of specific event
  //        @userId => String => Id of participating user
  // Output: None => Trigger socket to change status of whether user has voted
  lockInVote(eventId, userId){
    this.socket.emit('lockin', { eventId, userId })
  }

  // Input: @index => Number => Index of voted suggestion from event choices
  //        @eventId => String => Id of given event
  // Output: None => Trigger Action Creator to increase vote
  addVote(index, eventId) {
    this.props.increaseVote(index, eventId);
  }

  // Input: @index => Number => Index of voted suggestion from event choices
  //        @eventId => String => Id of given event
  // Output: None => Trigger Action Creator to decrease vote
  removeVote(index, eventId) {
    this.props.decreaseVote(index, eventId);
  }

  // Input: @eventId => String => Id of given event
  // Output: None => Trigger Action Creator to set isVoting to true
  setStartVote(eventId) {
    this.props.startVote(eventId);
  }

  // Input: @userId => String => Id of participating user SENDING the email
  //        @email => String => Email address from input field
  //        @eventId => String => Id of given event
  // Output: None => Trigger Action Creator to send out email
  inviteUser(userId, email, eventId) {
    this.props.inviteUser(userId, email, eventId);
  }

  // Input: @eventId => String => Id of given event
  // Output: None => Trigger Action Creator to set voteCompleted to true
  //              => Set choice property to suggestion with most votes
  setEndVote(eventId) {
    let winningEvent = this.props.event.choices.sort(function(a,b) {
      return b.netVotes - a.netVotes;
    })[0];
    this.props.endVote(winningEvent, eventId)
  }

  // Input: None
  // Output: None => Check if user is event Creator
  hostCheckRoll(){
    if(this.props.userInfo.userId === this.props.event.creator){
      return (
          <div className="reroll" onClick={ () => {
              if(confirm('Rerolling will get rid of all your current suggestions and populate new ones. Are you sure you want to reroll?')){ this.setStartVote(this.props.pollId) }
            }}>
            <FontAwesome name='refresh' size='3x' />
            <div>Get new choices</div>
          </div>
      )
    }
  }

  // Input: None
  // Output: None => Check if user is event Creator
  hostCheckStop(){
    if(this.props.userInfo.userId === this.props.event.creator){
      return (
        <div className="forceStop" onClick={ () => {
          if(confirm('This will end the vote early, are you sure?')){ this.setEndVote(this.props.pollId) }
        }}>
          <FontAwesome name='hand-paper-o' size='3x' />
          <div>Stop the Vote</div>
        </div>
      )
    }
  }

  render() {
    var slickSettings = {
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: true
    }
    let voteTotal = this.props.userStatus.length;
    let userVoted = this.props.userStatus.filter(user => user.status).length;

    if (this.props.event.isVoting && !this.props.event.voteCompleted) {
      return (
        //Would have to change to include commitments
        <div className="votefieldContainer">
            <div className="peopleVoted"> { userVoted } out of {voteTotal} participants decided!</div>
            <div className="voteboardContent">
              <div className="nominationContainer">
                <Slider className="slider" {...slickSettings}>
                {this.props.event.choices.map((nominee, i) =>
                  <div>
                    <PollingList
                      key={ i }
                      index={ i }
                      nominee={ nominee }
                      addVote={ this.addVote }
                      removeVote={ this.removeVote }
                      eventId={ this.props.pollId }
                      userStatus={ this.props.userStatus }
                      userInfo={ this.props.userInfo }
                    />
                  </div>
                )}
                </Slider>
              </div>
            </div>
            <div className="controlPanel">
              <div className="voteStatus"></div>
              <div className="voteControls">
                <div className="haveVoted">
                  <div className="haveVotedHeader">Vote Status</div>
                    <div className="voteStatusScroll">
                  {this.props.userStatus.map((person, i) =>
                    <div>
                      <UserStatus
                        key={ i }
                        index={ i }
                        person={ person }
                      />
                    </div>
                  )}
                  </div>
                </div>
                <div className="voteButtons">
                  <div className="lockIn" onClick={() => this.lockInVote(this.props.event._id, this.props.userInfo.userId)}>
                    <FontAwesome name='lock' size='3x' />
                    <div>Lock in vote</div>
                  </div>
                  { this.hostCheckRoll() }
                  { this.hostCheckStop() }
                </div>
              </div>
          </div>
        </div>
      );
    } else if (this.props.event.isVoting && this.props.event.voteCompleted) {
      return (
        <div className="votefieldContainer">
          <BulletinBoard
            winner={ this.props.event }
            pinnedMessages={ this.props.pinnedMessages }
            event={ this.props.event }
            participants={ this.props.participants }
            isHost={ this.props.userInfo.userId === this.props.event.creator }
            togglePin={ this.props.togglePinStatus }
            inviteUser={ this.inviteUser }
            getPinnedMessages={ this.props.getPinnedMessages }
          />
        </div>
      );
    } else {
        // Passing down startVote function
      return (
        <div className="votefieldContainer">
          <Lobby
            event={ this.props.event }
            eventId={ this.props.pollId }
            startVote={ this.setStartVote }
            inviteUser={ this.inviteUser }
            userInfo={ this.props.userInfo }
          />
        </div>
      );
    }
  }
};

function mapStateToProps(state) {
  return {
    participants: state.participants,
    voteStatus: state.voteStatus,
    userStatus: state.userStatus,
    event: state.event,
    userInfo: state.userInfo,
    pinnedMessages: state.pinnedMessages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteBoard);
