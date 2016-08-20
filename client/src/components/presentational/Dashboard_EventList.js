import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import '../../styles/css/dashboard.css';


class EventList extends Component {

  static propTypes = {
    userEvent: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.viewEvent = this.viewEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  viewEvent(userEvent){
    browserHistory.push(`/polling/${userEvent._id}`);
  }

  deleteEvent(eventId){
    if(confirm("Are you sure you want to delete this event?")){
      axios.post('/deleteevent', { eventId });
      setTimeout(() => this.props.getEvents(), 500);
    }
  }

  voteLobby(){
    const { userEvent } = this.props;
    return (
      <div>
        <div className="eventHeader">
          <div className="eventHeaderContent">
            { userEvent.name } | { userEvent.date } | { userEvent.time }
            <div className="removeEvent" onClick={ () => this.deleteEvent(userEvent._id) }>
              <FontAwesome name='times' size='1x' style={{ color: 'white' }} />
            </div>
          </div>
        </div>
        <div className="eventContent" onClick={ () => this.viewEvent(userEvent) }>
          <img src="http://i.imgur.com/BoojGXg.jpg" className="eventPicture"/>
          <div className="lobbyContent">Waiting for participants, { userEvent.users.length } total!</div>
        </div>
      </div>
    );
  }

  voteInProgress(){
    const { userEvent } = this.props;
    return (
      <div>
        <div className="eventHeader">
          <div className="eventHeaderContent">
            { userEvent.name } | { userEvent.date } | { userEvent.time }
            <div className="removeEvent" onClick={ () => this.deleteEvent(userEvent._id) }>
              <FontAwesome name='times' size='1x' style={{ color: 'white' }} />
            </div>
          </div>
        </div>
        <div className="eventContent" onClick={ () => this.viewEvent(userEvent) }>
          <img src="http://i.imgur.com/liCiciw.jpg" className="eventPicture"/>
          <div className="lobbyContent">Voting in progress! { userEvent.users.length } participants!</div>
        </div>
      </div>
    );
  }

  voteCompleted(){
    const { userEvent } = this.props;
    return (
      <div>
        <div className="eventHeader">
          <div className="eventHeaderContent">
            { userEvent.name } | { userEvent.date } | { userEvent.time }
            <div className="removeEvent" onClick={ () => this.deleteEvent(userEvent._id) }>
              <FontAwesome name='times' size='1x' style={{ color: 'white' }} />
            </div>
          </div>
        </div>
        <div className="eventContent" onClick={ () => this.viewEvent(userEvent) }>
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
