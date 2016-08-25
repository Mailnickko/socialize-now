import React, { Component, PropTypes } from 'react';
import '../../styles/css/dashboard.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import EventList from '../presentational/Dashboard_EventList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
      <ReactCSSTransitionGroup
        className="listOfEvents"
        transitionName="dashboardEvents"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        transitionAppear={true}
        transitionAppearTimeout={500}
        >
        {this.props.userEvents.map((userEvent, i) =>
          <EventList
            key={i}
            index={i}
            userEvent={userEvent}
            getEvents={this.props.grabUserEvents}
          />
        )}
      </ReactCSSTransitionGroup>
    );
  }
};

function mapStateToProps(state) {
  return {
    userEvents: state.userEvents
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventBoard);
