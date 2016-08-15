import React, { Component } from 'react';
import '../../styles/css/dashboard.css';

class EventList extends Component {

  render() {
    const { userEvent } = this.props;
    return (
      <div className="eventItem">
        <div className="eventContent">
          <div className="eventHeader">{ userEvent.name }</div>
        </div>
      </div>
    );
  }
};

export default EventList;
