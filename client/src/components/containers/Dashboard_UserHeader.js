import React, { Component } from 'react';
import '../../styles/css/temp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';

class UserHeader extends Component {
  // Promoted to container for now, possibly consider creating a wrapper
  render() {
    return (
      <div>
        <span>Welcome {this.props.singleUser[0].username}</span>
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
