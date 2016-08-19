import React, { Component } from 'react';
import '../../styles/css/dashboard.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import FontAwesome from 'react-fontawesome';

class NewEvent extends Component {

  constructor(props) {
    super(props);
    this.makeEvent = this.makeEvent.bind(this);
  }

  //Hate to do it this way..very hacky but redux forms is giving us some trouble
    //This should work for no until we come up with a better solution
  makeEvent(e) {
    e.preventDefault();
    // Ugly way of checking but serves our MVP purposes
    let currDate = new Date();
    if (this.refs.date.value < currDate) {
      return false;
    } else {
      let constraints = {
        date: this.refs.date.value,
        time: this.refs.time.value,
        name: this.refs.eventName.value,
        locations: this.refs.locations.value.split(','),
        tags: this.refs.tags.value.split(','),
        priceRange: this.refs.priceRange.value
      };
      //pass in the contraints obj, attach the current user's profile
      this.props.createNewEvent(constraints);
      this.refs.newEventForm.reset();
    }
  }

  render() {
    return (
      <div className="newVoteContainer">
        <form ref="newEventForm" className="formContainer" onSubmit={ this.makeEvent }>
          <h1 className="newEventHeader">New Event</h1>
          <label>Date:</label>
          <input type="date" ref="date" />
          <label>Event Name</label>
          <input type="text" placeholder="ie. Birthday Party" ref="eventName" />
          <label>Time:</label>
          <input type="time" ref="time" />
          <label>Locations:</label>
          <input type="text" placeholder="ie. Los Angeles, San Francisco" ref="locations" />
          <label>Preferred Tags:</label>
          <input type="text" placeholder="ie. Movies, Tacos, Bars" ref="tags" />
          <label>Price Range:</label>
          <select ref="priceRange">
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
          </select>
          <button className="constraintBtn" action="submit">Create Event</button>
        </form>
        <div className="line"></div>
        <div className="widget">
          <FontAwesome name='calendar' size='3x' style={{ color: 'white', display: 'inline' }} /><h1 style={{ color: 'white', display: 'inline' }}> Calendar</h1>
        </div>
        <div className="line"></div>
        <div className="widget">
          <FontAwesome name='gear' size='3x' style={{ color: 'white', display: 'inline' }} /><h1 style={{ color: 'white', display: 'inline' }}> Settings</h1>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
    //Not sure what kind of error we'd return here
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);
