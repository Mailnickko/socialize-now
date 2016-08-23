import React, { Component, PropTypes } from 'react';
import '../../styles/css/temp.css';

class ParticipantList extends Component {
  static propTypes = {
    participant: PropTypes.object
  };
  render() {
    const { participant } = this.props;
    return (
      <div className="userContainer animated fadeInUp">
        <img className="participantBG" src={ participant.picture } alt="user_profile" />
        <div className="participantInfo">
          <div className="userKick">Kick</div>
          <img src={ participant.picture } alt="user_profilePic" className="participantPhoto"/>
          <div className="participantName">{ participant.name } </div>
        </div>
      </div>
    );
  }
};

export default ParticipantList;
