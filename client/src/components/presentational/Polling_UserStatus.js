import React, { Component, PropTypes } from 'react';

//think of this as simply a wrapper for the Nominations page
class UserStatus extends Component {

  render() {
    const person = this.props.person;
    return (
      <div className='userStatusContainer'>
        <div className="hasVoted">
          <div className="hasVotedContent">
            <div>{ person.name }</div>
            <bdi>{ person.status }</bdi>
          </div>
        </div>
        <img src={person.picture} className="statusImage"/>
      </div>
    );
  }
};

export default UserStatus;
