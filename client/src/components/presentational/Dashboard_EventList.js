import React, { Component } from 'react';
import '../../styles/css/dashboard.css';

class EventList extends Component {

  render() {
    const { suggestion } = this.props;
    console.log(suggestion);
    return (
      <div className="eventItem">
        <div>{ suggestion.locationName }</div>
      </div>
    );
  }
};

export default EventList;
