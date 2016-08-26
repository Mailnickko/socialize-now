import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import ParticipantList from '../presentational/ParticipantList';

class ParticipantsBoard extends Component {
  static propTypes = {
    participants: PropTypes.array.isRequired,
    event: PropTypes.object.isRequired,
    isHost: PropTypes.bool.isRequired
  }

  render() {
    return (
      <div className="userListContainer">
        {this.props.participants.map((participant, i) =>
          <ParticipantList
            key={i}
            participant={participant}
            isHost={this.props.isHost}
          />
        )}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    participants: state.participants,
    event: state.event
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsBoard);
