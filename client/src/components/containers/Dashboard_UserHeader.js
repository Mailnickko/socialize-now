import React, { Component } from 'react';
import '../../styles/css/dashboard.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';

class UserHeader extends Component {

  componentWillMount() {
    // Set the active user to display their info in Header
    this.props.grabUserEvents(this.props.activeUser[0].id);
  }
  // Promoted to container for now, possibly consider creating a wrapper
  render() {
    return (
      <div className="userHeader">
        <h1 className="headerContent">Welcome {this.props.activeUser[0].username}</h1>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    // Would contain specific user info in state
    activeUser: state.activeUser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
