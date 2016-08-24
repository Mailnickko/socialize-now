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
    pollId: PropTypes.string.isRequired
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

  inviteUser(userId, email, eventId) {
    this.props.inviteUser(userId, email, eventId);
  }

  setEndVote(eventId) {
    //currently determining winner from dummy nominees obj, will likely have to update once we get actual suggestions
    let winningEvent = this.props.event.choices.sort(function(a,b) {
      return b.netVotes - a.netVotes;
    })[0];
    // this.props.setWinningResult(winningEvent, eventId);
    this.props.endVote(winningEvent, eventId)
  }

  // Do this to reuse the nominations board component
    //Will probably have to refactor to render via external methods for modularity
  render() {
    var slickSettings = {
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: true
    }
    if (this.props.event.isVoting && !this.props.event.voteCompleted) {
      return (
        //Would have to change to include commitments
        <div className="votefieldContainer">
            <div className="peopleVoted">PLACEHOLDER (2/5)</div>
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
                  <div className="lockIn">
                    <FontAwesome name='lock' size='3x' />
                    <div>Lock in vote</div>
                  </div>
                  <div className="reroll">
                    <FontAwesome name='refresh' size='3x' />
                    <div>Get new choices</div>
                  </div>
                  <div className="forceStop" onClick={ () => this.setEndVote(this.props.pollId) }>
                    <FontAwesome name='hand-paper-o' size='3x' />
                    <div>Stop the Vote</div>
                  </div>
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
          />
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
    userStatus: state.userStatus,
    event: state.event,
    pinnedMessages: state.pinnedMessages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteBoard);
