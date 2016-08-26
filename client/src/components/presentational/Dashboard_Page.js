import React, { Component } from 'react';
import '../../styles/css/dashboard.css';
import NewVote from '../containers/Dashboard_NewVote';
import UserHeader from '../containers/Dashboard_UserHeader';
import EventBoard from '../containers/Dashboard_EventBoard';

class Dashboard extends Component {

  render() {
    return (
      <div className="dashboardContainer">
        <NewVote/>
        <div className="eventBoardContainer" id="page-wrap">
          <UserHeader />
          <EventBoard />
        </div>
      </div>
    );
  }
};

export default Dashboard;
