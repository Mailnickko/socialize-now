import React, { Component } from 'react';
import '../../styles/css/polling.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import UserStatus from '../presentational/Polling_ControlBoard_UserStatus';

class VoteBoard extends Component {

  render() {
    return (
      <div className="voterStatusContainer">
        {this.props.suggestions.map((suggestion, i) =>
          <UserStatus
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteBoard);
