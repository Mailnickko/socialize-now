import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import Moment from 'moment';
import { formatTime } from '../../componentHelpers/timeFormat';

class EventDetails extends Component {

  static propTypes = {
    winner: PropTypes.object.isRequired
  }

  render() {
    const { winner } = this.props;
    let formattedTime = formatTime(winner.time);
    return (
      <div className="winner">
        <div className="winnerNominee animated flipInX">
          <img className='winnerBG' src={winner.choice[0].imageURL} alt="nominated-event" />
          <div className="nomineeInfo">
            <img className='winnerPic' src={winner.choice[0].imageURL} alt="nominated-event" />
            <div className="winnerName">{ winner.name }</div>
            <a href={ winner.choice[0].url } target='_blank' style={{'margin': 'auto'}}>
              <button className="infoBtnBoard"/>
            </a>
            <div className="winnerDetails">
              <div className="nomineeAddress">
                <FontAwesome className="addressIcon" name='map-marker' size='3x'/>
                <div>{ winner.choice[0].name }</div>
                <div>{ winner.choice[0].address[0] }</div>
                <div>{ winner.choice[0].address[2] }</div>
              </div>
              <div className="winnerTime">
                <FontAwesome className="timeIcon" name='clock-o' size='3x'/>
                <div>{ formattedTime }</div>
                <div>{ Moment(winner.date).format('MMM Do YYYY') }</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EventDetails;
