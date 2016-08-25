import React, { Component, PropTypes } from 'react';
import '../../styles/css/dashboard.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import FontAwesome from 'react-fontawesome';
import BurgerMenu from 'react-burger-menu';
import Geosuggest from 'react-geosuggest';

class NewEvent extends Component {

  static propTypes = {
    createNewEvent: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      dateErr: '',
      nameErr: '',
      timeErr: '',
      locationErr: ''
    };
    this.makeEvent = this.makeEvent.bind(this);
    this.makeDate = this.makeDate.bind(this);
  }

  makeDate(date) {
    let dateArr = date.split('-')
    let year = dateArr[0];
    let month = dateArr[1];
    let day = dateArr[2];
    return new Date(year, month - 1, day);
  }

  //Hate to do it this way..very hacky but redux forms is giving us some trouble
    //This should work for no until we come up with a better solution
  makeEvent(e) {
    e.preventDefault();
    // Ugly way of checking but serves our MVP purposes
    let currDate = new Date();
    let eventDate = this.makeDate(this.refs.date.value);
    if (eventDate < currDate) {
      this.setState({
        dateErr: 'Please select a valid date'
      });
    } else if (!this.refs.time.value) {
      this.setState({
        timeErr: 'Please select a time'
      });
    } else if (!this.refs.eventName.value) {
      this.setState({
        nameErr: 'Please select an event name'
      });
    } else if (!e.target.location.value) {
      this.setState({
        locationErr: 'Please select an event city'
      });
    } else {
      let constraints = {
        date: this.refs.date.value,
        time: this.refs.time.value,
        name: this.refs.eventName.value,
        location: e.target.location.value.split(',')[0],
      };
      //pass in the contraints obj, attach the current user's profile
      console.log(constraints);
      this.props.createNewEvent(constraints);
      this.refs.newEventForm.reset();
    }
  }

  render() {
    const Menu = BurgerMenu['push'];
    return (
      <Menu width={400} pageWrapId={ "page-wrap" }>
        <form ref="newEventForm" className="formContainer" onSubmit={ this.makeEvent }>
          <h1 className="newEventHeader">New Event</h1>
          <label>Date:</label>
          <div className="formError">{this.state.dateErr}</div>
          <input type="date" ref="date" />
          <label>Event Name</label>
          <div className="formError">{this.state.nameErr}</div>
          <input type="text" placeholder="ie. Birthday Party" ref="eventName" />
          <label>Time:</label>
          <div className="formError">{this.state.timeErr}</div>
          <input type="time" ref="time" />
          <label>Location:</label>
          <div className="formError">{this.state.locationErr}</div>
          <Geosuggest
            placeholder="Start typing!"
            initialValue="San Francisco"
            ref="location"
            name="location"
          />
          <button className="constraintBtn" action="submit">Create Event</button>
        </form>
      </Menu>
    );
  }
};

function mapStateToProps(state) {
    //Not sure what kind of formError we'd return here
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);
