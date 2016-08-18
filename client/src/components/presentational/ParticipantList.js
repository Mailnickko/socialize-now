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
        <img className="profilePicture" src={ participant.picture } alt="user_profile" />
        <p className="profileName">
          { participant.name }
        </p>
      </div>
    );
  }
};

export default ParticipantList;
