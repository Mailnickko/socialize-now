import React, { Component, PropTypes } from 'react';

class UserStatus extends Component {

  voteStatusCheck(){
    if(this.props.person.status){
      return (
        <div><bdi>Voted!</bdi></div>
      )
    } else {
      return (
        <div><bdi>Deciding...</bdi></div>
      )
    }
  }

  render() {
    const person = this.props.person;
    return (
      <div className='userStatusContainer'>
        <div className="hasVoted">
          <div className="hasVotedContent">
            <div>{ person.name }</div>
            { this.voteStatusCheck() }
          </div>
        </div>
        <img src={person.picture} className="statusImage"/>
      </div>
    );
  }
};

export default UserStatus;
