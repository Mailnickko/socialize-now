import React, { Component } from 'react';
import '../../styles/css/polling.css';
import FontAwesome from 'react-fontawesome'

class PollingList extends Component {

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
    return (
      <div className="nominee">
        <h2>{ nominee.locationName }</h2>
        <h4>Current likes: { nominee.netVotes }</h4>
          <img className='profilePicture' src={ nominee.locationImg } alt="nominated-event" />
          <div>
            <button className="infoBtn">
                <a className="btnLink" href={nominee.locationInfo} target='_blank'>Info</a>
            </button>
            <div>
              <FontAwesome name='thumbs-down' size='2x' style={{ color: 'red' }} onClick={ (e) => this.handleDownVote(e,index, eventId)}/>
              <FontAwesome name='thumbs-up' size='2x' style={{ color: '#4CF33C' }} onClick={ (e) => this.handleUpVote(e,index, eventId)}/>
            </div>
          </div>
      </div>
    );
  }
};

export default PollingList;
