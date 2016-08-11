import React, { Component, PropTypes } from 'react';
import '../../styles/css/temp.css';

class ParticipantList extends Component {
  static contextTypes = {
    participant: PropTypes.object
  };
  render() {
    const { participant } = this.props;
    return (
      <div className="userContainer">
        <img className="profilePicture" src={ participant.profile } alt="user_profile" />
        <p>
          <h3>{ participant.username }</h3>
          <i>{ participant.quote }</i>
        </p>
      </div>
    );
  }
};

export default ParticipantList;
