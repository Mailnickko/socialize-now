import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import FontAwesome from 'react-fontawesome'

class PollingList extends Component {

  static propTypes = {
    addVote: PropTypes.func.isRequired,
    removeVote: PropTypes.func.isRequired,
    nominee: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    eventId: PropTypes.number.isRequired
  }

  constructor() {
    super();
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  handleUpVote(e, index, eventId) {
    e.preventDefault();
    this.props.addVote(index, eventId);
  }

  handleDownVote(e, index, eventId) {
    e.preventDefault();
    this.props.removeVote(index, eventId);
  }

  render() {
    const { nominee, index, eventId } = this.props;
    let address = nominee.address[2].split(' ').slice(0, -1).join(' ');
    return (
      <div className="nominee">
        <img className='nomineeBG' src={ nominee.imageURL } alt="nominated-event" />
        <div className="nomineeInfo">
          <img className='nomineePic' src={ nominee.imageURL } alt="nominated-event" />
          <div className="yelpRating">
            <img src={ nominee.ratingImg } className="yelpStars" alt="nominated-event" />
            <div className="reviewCount"> ({ nominee.reviewCount })</div>
          </div>
          <div className="nomineeName">{ nominee.name }</div>
          <div className="nomineeAddress">{ address }</div>
            <a href={nominee.url} target='_blank' style={{'margin': 'auto'}}>
              <button className="infoBtn"></button>
            </a>
          <div>
            <div className="votingInterface">
              <FontAwesome className="voteArrow" name='arrow-circle-o-down' size='4x' flip='horizontal' style={{ color: 'red' }} onClick={ (e) => this.handleDownVote(e,index, eventId) }/>
              <div className="votes">
                <div>{ nominee.netVotes }</div>
                <div>Current Likes</div>
              </div>
              <FontAwesome className="voteArrow" name='arrow-circle-o-up' size='4x' style={{ color: 'green' }} onClick={ (e) => this.handleUpVote(e,index, eventId) }/>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PollingList;
