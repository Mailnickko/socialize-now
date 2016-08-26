import React, { Component, PropTypes } from 'react';
import '../../styles/css/polling.css';
import FontAwesome from 'react-fontawesome';

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

  // Input: @e => JS event
  //        @index => Number => Index of specific choice in choices array
  //        @eventId => String => Id of specific event
  // Output: None => Trigger Action Creator to upvote specific choice
  handleUpVote(e, index, eventId) {
    e.preventDefault();
    this.props.addVote(index, eventId);
  }

  // Input: @e => JS event
  //        @index => Number => Index of specific choice in choices array
  //        @eventId => String => Id of specific event
  // Output: None => Trigger Action Creator to downvote specific choice
  handleDownVote(e, index, eventId) {
    e.preventDefault();
    this.props.removeVote(index, eventId);
  }

  // Input: @None
  // Output: Boolean => Boolean determining is user has locked-in vote
  hasLockedIn(){
    let personIndex;
    this.props.userStatus.forEach((item, index) => {
      if(item.userId === this.props.userInfo.userId) return personIndex = index;
    });

    if (personIndex > -1){
      return this.props.userStatus[personIndex].status;
    }
  }

  // Input: None
  // Output: View => Thumbs up icon
  renderUpVote(){
    const { index, eventId } = this.props;
    if(!this.hasLockedIn()){
      return (
        <FontAwesome className="voteArrow voteDown" name='arrow-circle-o-down' size='5x' flip='horizontal' style={{ color: 'red' }} onClick={ (e) => this.handleDownVote(e,index, eventId) }/>
      )
    }
  }

  // Input: None
  // Output: View => Thumbs down icon
  renderDownVote(){
    const { index, eventId } = this.props;
    if(!this.hasLockedIn()){
      return (
        <FontAwesome className="voteArrow voteUp" name='arrow-circle-o-up' size='5x' style={{ color: 'green' }} onClick={ (e) => this.handleUpVote(e,index, eventId) }/>
      )
    }
  }

  render() {
    const { nominee, index, eventId } = this.props;
    let address = '';
    if(nominee.address[2]){
      address = nominee.address[2].split(' ').slice(0, -1).join(' ');
    }
    return (
      <div className="nominee">
        <a href={ nominee.url } target='_blank' style={{'margin': 'auto'}}>
          <button className="infoBtn"/>
        </a>
        <div className="votingInterface">
          {this.renderUpVote()}
          <div className="votes">
            <div>{ nominee.netVotes }</div>
            <div>Current Likes</div>
          </div>
          {this.renderDownVote()}
        </div>
        <div className="yelpRating">
          <img src={ nominee.ratingImg } className="yelpStars" alt="nominated-event" />
          <div className="reviewCount"> ({ nominee.reviewCount })</div>
        </div>
        <img className='nomineeBG' src={ nominee.imageURL } alt="nominated-event" />
        <div className="nomineeInfo">
          <img className='nomineePic' src={ nominee.imageURL } alt="nominated-event" />
          <div className="nomineeName">{ nominee.name }</div>
          <div className="nomineeAddress">{ address }</div>
        </div>
      </div>
    );
  }
};

export default PollingList;
