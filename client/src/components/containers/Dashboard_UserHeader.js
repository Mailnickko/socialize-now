import React, { Component } from 'react';
import '../../styles/css/dashboard.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';

class UserHeader extends Component {
  // Promoted to container for now, possibly consider creating a wrapper
  render() {
    return (
      <div className="userHeader">
        <h1>Welcome {this.props.singleUser[0].username}</h1>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    // Would contain specific user info in state
    singleUser: state.singleUser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
