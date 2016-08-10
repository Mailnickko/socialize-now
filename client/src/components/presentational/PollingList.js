import React, { Component } from 'react';
import '../../styles/css/temp.css';

class PollingList extends Component {

  constructor() {
    super();
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  handleUpVote(e, index) {
    e.preventDefault();
    this.props.addVote(index);
  }

  handleDownVote(e, index) {
    e.preventDefault();
    this.props.removeVote(index);
  }

  render() {
    const { nominee, index } = this.props;
    return (
      <div>
        <div>{ nominee.locationName }</div>
          <img src={ nominee.locationImg } alt="nominated-event" />
          <div><a href={nominee.locationInfo}>Info</a></div>
          <span>Current likes: { nominee.netVotes }</span>
          <button onClick={ (e) => this.handleUpVote(e,index)}>Upvote</button>
          <button onClick={ (e) => this.handleDownVote(e,index)}>Downvote</button>
      </div>
    );
  }
};

export default PollingList;
