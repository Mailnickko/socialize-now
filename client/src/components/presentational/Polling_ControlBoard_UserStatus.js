import React, { Component } from 'react';
import '../../styles/css/temp.css';
import FontAwesome from 'react-fontawesome'

class UserStatus extends Component {

  render() {
    return (
      <div className="voterStatus">
        <p><FontAwesome name='bomb' spin style={{ color: '#4CF33C' }}/> Robin Kim</p>
      </div>
    );
  }
};

export default UserStatus;
