import React, { Component } from 'react';
import '../../styles/css/temp.css';

class UserStatus extends Component {

  render() {
    const { suggestion } = this.props;
    return (
      <div className="voterStatus">
        <div>Robin Kim: Online</div>
      </div>
    );
  }
};

export default UserStatus;
