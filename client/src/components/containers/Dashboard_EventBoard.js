import React, { Component } from 'react';
import '../../styles/css/dashboard.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import EventList from '../presentational/Dashboard_EventList';

class EventBoard extends Component {

  componentWillMount() {
    // fetch commitments based on user
    this.props.grabUserEvents(this.props.activeUser[0].id);
    this.props.grabUserInfo(this.props.activeUser[0].username);

  }

  render() {
    return (
      //Would have to change to include commitments
      <div>
        {this.props.suggestions.map((suggestion, i) =>
          <EventList
            key={i}
            index={i}
            suggestion={suggestion}
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
    suggestions: state.suggestions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventBoard);
