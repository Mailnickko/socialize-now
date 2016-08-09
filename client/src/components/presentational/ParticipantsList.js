import React, { Component, PropTypes } from 'react';
import '../../styles/css/temp.css';

class ParticipantsList extends Component {
  static contextTypes = {
    participant: PropTypes.object
  };
  render() {
    const { participant } = this.props;
    return (
      <div>
        <img src={ participant.profile } alt="user_profile" />
        <span>{ participant.username }</span>
      </div>
    )
  }
}

export default ParticipantsList;