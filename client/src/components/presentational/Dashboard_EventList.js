import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import '../../styles/css/dashboard.css';
import Moment from 'moment';

class EventList extends Component {

  static propTypes = {
    userEvent: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.viewEvent = this.viewEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.formatTime = this.formatTime.bind(this);
  }

  viewEvent(userEvent){
    browserHistory.push(`/polling/${userEvent._id}`);
  }

  deleteEvent(eventId){
    let confirmationPrompt = prompt('Are you sure you want to delete this event? Please type "'  + this.props.userEvent.name +  '" to confirm.')
    if(this.props.userEvent.name === confirmationPrompt){
      axios.post('/deleteevent', { eventId });
      setTimeout(() => this.props.getEvents(), 500);
    }
  }

  formatTime(givenTime) {
    let timeArr = givenTime.split(':');
    let hour = timeArr[0];
    let min = timeArr[1];
    if (parseInt(hour) === 12) {
      return givenTime + ' PM';
    } else if (parseInt(hour) > 12) {
      return (parseInt(hour) - 12) + ':' + min + ' PM';
    } else {
      return givenTime + ' AM';
    }
  }

  voteLobby(){
    const { userEvent } = this.props;
    let formattedTime = this.formatTime(userEvent.time);
    return (
      <div className="dashEvents">
        <div className="eventContent">
          <div className="imageContainer">
            <img src="http://i.imgur.com/BoojGXg.jpg" className="eventPicture"/>
          </div>
          <div className="removeEvent" onClick={ () => this.deleteEvent(userEvent._id) }>
            <FontAwesome name='times' size='2x' />
          </div>
          <div className="eventTitleContainer" onClick={ () => this.viewEvent(userEvent) }>
            <div className="eventTitle">{ userEvent.name }</div>
          </div>
          <div className="eventStatus">
            Waiting in Lobby <br/> { userEvent.users.length } participants!
          </div>
          <div className="eventTime">
            { Moment(userEvent.date).format('MMM Do YYYY') } | { formattedTime }
          </div>
        </div>
      </div>
    );
  }

  voteInProgress(){
    const { userEvent } = this.props;
    let formattedTime = this.formatTime(userEvent.time);
    return (
      <div className="dashEvents">
        <div className="eventContent">
          <div className="imageContainer">
            <img src="http://i.imgur.com/liCiciw.jpg" className="eventPicture"/>
          </div>
          <div className="removeEvent" onClick={ () => this.deleteEvent(userEvent._id) }>
            <FontAwesome name='times' size='2x' />
          </div>
          <div className="eventTitleContainer" onClick={ () => this.viewEvent(userEvent) }>
            <div className="eventTitle">{ userEvent.name }</div>
          </div>
          <div className="eventStatus">
            Voting in progress! <br/> { userEvent.users.length } participants!
          </div>
          <div className="eventTime">
            { Moment(userEvent.date).format('MMM Do YYYY') } | { formattedTime }
          </div>
        </div>
      </div>
    );
  }

  voteCompleted(){
    const { userEvent } = this.props;
    let formattedTime = this.formatTime(userEvent.time);
    return (
      <div className="dashEvents">
        <div className="eventContent">
          <div className="imageContainer">
            <img src={ userEvent.choice[0].imageURL } className="eventPicture"/>
          </div>
          <div className="removeEvent" onClick={ () => this.deleteEvent(userEvent._id) }>
            <FontAwesome name='times' size='2x' />
          </div>
          <div className="eventTitleContainer" onClick={ () => this.viewEvent(userEvent) }>
            <div className="eventTitle">{ userEvent.name }</div>
          </div>
          <div className="eventAddress">
            {userEvent.choice[0].name} <br/> {userEvent.choice[0].address[0]} <br/> {userEvent.choice[0].address[2]}
          </div>
          <div className="eventTime">
            { Moment(userEvent.date).format('MMM Do YYYY') } | { formattedTime }
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
