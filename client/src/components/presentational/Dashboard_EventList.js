import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import '../../styles/css/dashboard.css';

class EventList extends Component {

  static propTypes = {
    userEvent: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.viewEvent = this.viewEvent.bind(this);
  }

  viewEvent(userEvent){
    browserHistory.push(`/polling/${userEvent._id}`);
  }

  render() {
    const { userEvent } = this.props;
    return (
      <div onClick={ () => this.viewEvent(userEvent) }>
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
