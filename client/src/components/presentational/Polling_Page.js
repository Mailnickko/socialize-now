import React, { Component } from 'react';
import '../../styles/css/polling.css';
import PollingBoard from '../containers/VoteBoard';
import PollingControlBoard from '../presentational/Polling_ControlBoard';
import * as actionCreators from '../../actions/actionCreators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//think of this as simply a wrapper for the Nominations page
class Polling extends Component {

  componentWillMount(){
    this.props.getEvent(this.props.params.pollId);
  }

  render() {
    console.log(this.props.params.pollId)
    return (
      <div className="pollingContainer">
        <PollingBoard />
        <PollingControlBoard />
      </div>
    );
  }
};

export default Polling;

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Polling);