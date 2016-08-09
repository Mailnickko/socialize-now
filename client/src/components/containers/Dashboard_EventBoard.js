import React, { Component } from 'react';
import '../../styles/css/temp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import EventList from '../presentational/Dashboard_EventList';

class EventBoard extends Component {

  componentWillMount() {
    // fetch commitments based on user
  }

  render() {
    return (
      //Would have to change to include commitments
      <div>
        {this.props.suggestions.map((suggestion, i) =>
          <EventList
            key={i}
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
    suggestions: state.suggestions
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventBoard);
