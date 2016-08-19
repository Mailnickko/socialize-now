import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import '../../styles/css/dashboard.css';

class EventList extends Component {

  static propTypes = {
    userEvent: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.viewEvent = this.viewEvent.bind(this);
  }

  viewEvent(userEvent){
    browserHistory.push(`/polling/${userEvent._id}`);
  }

  voteLobby(){
    const { userEvent } = this.props;
    return (
      <div onClick={this.viewEvent.bind(this, userEvent)}>
        <div className="eventHeader">
          <div className="eventHeaderContent">{ userEvent.name } | { userEvent.date } | { userEvent.time } | LOBBY</div>
        </div>
        <div className="eventContent">
          <img src="http://i.imgur.com/BoojGXg.jpg" className="eventPicture"/>
          <div className="lobbyContent">Waiting for participants, { userEvent.users.length } total!</div>
        </div>
      </div>
    );
  }

  voteInProgress(){
    const { userEvent } = this.props;
    return (
      <div onClick={this.viewEvent.bind(this, userEvent)}>
        <div className="eventHeader">
          <div className="eventHeaderContent">{ userEvent.name } | { userEvent.date } | { userEvent.time } | IN PROGRESS</div>
        </div>
        <div className="eventContent">
          <img src="http://i.imgur.com/liCiciw.jpg" className="eventPicture"/>
          <div className="lobbyContent">Voting in progress! { userEvent.users.length } participants!</div>
        </div>
      </div>
    );
  }

  voteCompleted(){
    const { userEvent } = this.props;
    return (
      <div onClick={ () => this.viewEvent(userEvent) }>
        <div className="eventHeader">
          <div className="eventHeaderContent">{ userEvent.name } | { userEvent.date } | { userEvent.time }</div>
        </div>
        <div className="eventContent">
          <img src={ userEvent.choice[0].imageURL } className="eventPicture"/>
          <div className="lobbyContent">
            { userEvent.choice[0].name }
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { userEvent } = this.props;
    if(!userEvent.isVoting){
      return this.voteLobby();
    } else if(!userEvent.voteCompleted){
      return this.voteInProgress();
    } else {
      return this.voteCompleted();
    }
  }
};

export default EventList;
