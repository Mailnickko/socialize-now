import React, { Component, PropTypes } from 'react';
import '../../styles/css/dashboard.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import EventList from '../presentational/Dashboard_EventList';

class EventBoard extends Component {

  static propTypes = {
    userEvents: PropTypes.array.isRequired,
    grabUserEvents: PropTypes.func.isRequired
  }

  componentWillMount() {
    // fetch commitments based on user
    this.props.grabUserEvents();
  }

  render() {
    return (
      //Would have to change to include commitments
      <div>
        {this.props.userEvents.map((userEvent, i) =>
          <EventList
            key={i}
            index={i}
            userEvent={userEvent}
          />
        )}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    //would need data for commitments
    //the suggestions state would actually be swapped for the events a user is tied to
    userEvents: state.userEvents
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventBoard);
