import React, { Component } from 'react';
import '../../styles/css/temp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actionCreators from '../../actions/actionCreators';

class UserHeader extends Component {

  render() {
    return (
      <div>
        <span>Sample User name</span>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    // Would contain specific user info in state
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);