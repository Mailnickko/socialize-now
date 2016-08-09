import React, { Component, PropTypes } from 'react';
import '../../styles/css/temp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import ParticipantsList from '../presentational/ParticipantsList';

class ParticipantsBoard extends Component {
  static propTypes = {
    participants: PropTypes.object
  };

  render() {
    return (
      <div>
        {this.props.participants.map((participant, i) =>
          <ParticipantsList
            key={i}
            participant={participant}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    participants: state.participants
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsBoard);
