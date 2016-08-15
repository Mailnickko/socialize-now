import React, { Component } from 'react';
import '../../styles/css/dashboard.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';

class UserHeader extends Component {

  componentWillMount(){
    this.props.grabUserInfo();
  }

  // Promoted to container for now, possibly consider creating a wrapper
  render() {
    const { userInfo } = this.props;
    return (
      <div className="userHeader">
        <h1 className="headerContainer"><img className="profileImage" src={ userInfo.picture }/><p className="headerContent">Welcome { userInfo.name }!</p></h1>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    // Would contain specific user info in state
    userInfo: state.userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
