import React, { Component } from 'react';
import '../../styles/css/temp.css';
import NominationsBoard from '../containers/Nominations_Board';
import NominationsControlBoard from '../presentational/Nominations_ControlBoard';

//think of this as simply a wrapper for the Nominations page
class Nominations extends Component {
  // This page will contain components for the chat feature when we get around to it
  render() {
    return (
      <div>
        <NominationsBoard />
        <NominationsControlBoard />
      </div>
    );
  }
};

export default Nominations;
