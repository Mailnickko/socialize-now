import React, { Component } from 'react';
import '../../styles/css/dashboard.css';
import NewVote from '../containers/Dashboard_NewVote';
import UserHeader from '../containers/Dashboard_UserHeader';
import EventBoard from '../containers/Dashboard_EventBoard';

//think of this as simply a wrapper for the dashboard page
class Dashboard extends Component {

  render() {
    return (
      <div className="dashboardContainer">
        <NewVote/>
        <div className="eventBoardContainer">
          <UserHeader />
          <EventBoard />
        </div>
      </div>
    );
  }
};

export default Dashboard;
