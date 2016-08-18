import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import '../../styles/css/dashboard.css';

class EventList extends Component {

  viewEvent(userEvent){
    browserHistory.push(`/polling/${userEvent._id}`);
  }

  render() {
    const { userEvent } = this.props;
    return (
      <div onClick={this.viewEvent.bind(this, userEvent)}>
        <div className="eventHeader">
          <div className="eventHeaderContent">{ userEvent.name } | { userEvent.date } | { userEvent.time }</div>
        </div>
        <div className="eventContent">
          <div>More info here later</div>
        </div>
      </div>
    );
  }
};

export default EventList;
