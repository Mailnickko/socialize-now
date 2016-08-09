import React, { Component } from 'react';
import '../../styles/css/temp.css';

class PollingList extends Component {

  render() {
    const { nominee } = this.props;
    return (
      <div>
        <div>{ nominee.locationName }</div>
          <img src={ nominee.locationImg } alt="nominated-event" />
          <div><a href={nominee.locationInfo}>Info</a></div>
      </div>
    );
  }
};

export default PollingList;
