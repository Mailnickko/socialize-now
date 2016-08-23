import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

class EventDetails extends Component {

  static propTypes = {
    winner: PropTypes.object.isRequired
  }

  render() {
    const { winner } = this.props;
    return (
      <div className="winner">
        <Link to="/dashboard"><button>Back to Dashboard</button></Link>
        <div className="winnerContent">
          <h1>{ winner.name }</h1>
          <h3>{ winner.date }</h3>
          <h3>{ winner.time }</h3>
          <p>{winner.choice[0].name}</p>
          <p>{winner.choice[0].address}</p>
          <p>{winner.choice[0].rating}</p>
          <p>{winner.choice[0].reviewCount}</p>
          <p>{winner.choice[0].url}</p>
          <p>{winner.choice[0].imageURL}</p>
        </div>
      </div>
    );
  }
};

export default EventDetails;
