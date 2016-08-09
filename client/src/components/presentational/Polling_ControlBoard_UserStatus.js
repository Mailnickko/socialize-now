import React, { Component } from 'react';
import '../../styles/css/temp.css';

class UserStatus extends Component {

  render() {
    const { suggestion } = this.props;
    return (
      <div>
        <div>{ suggestion.locationName }</div>
        <div>User Status</div>
      </div>
    );
  }
};

export default UserStatus;
