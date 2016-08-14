import React, { Component } from 'react';
import '../../styles/css/dashboard.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';

class UserHeader extends Component {
  constructor(){
    super();
  }


  componentWillMount(){
    this.props.grabUserInfo();
  }

  // Promoted to container for now, possibly consider creating a wrapper
  render() {
    return (
      <div className="userHeader">
        <h1 className="headerContainer"><img className="profileImage" src={this.props.picture}/><p className="headerContent">Welcome {this.props.name}!</p></h1>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    // Would contain specific user info in state
    name: state.userInfo.name,
    picture: state.userInfo.picture

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
