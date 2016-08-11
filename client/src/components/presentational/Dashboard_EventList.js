import React, { Component } from 'react';
import '../../styles/css/dashboard.css';

class EventList extends Component {

  render() {
    const { suggestion } = this.props;
    return (
      <div className="eventItem">
        <div className="eventContent">
          <div className="eventHeader">{ suggestion.locationName }</div>
        </div>
      </div>
    );
  }
};

export default EventList;
