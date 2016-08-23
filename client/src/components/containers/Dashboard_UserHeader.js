import React, { Component, PropTypes } from 'react';
import '../../styles/css/dashboard.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class UserHeader extends Component {

  static propTypes = {
    grabUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired
  }

  componentWillMount(){
    this.props.grabUserInfo();
  }

  // Promoted to container for now, possibly consider creating a wrapper
  render() {
    const { userInfo } = this.props;
    return (
        <div className="userHeader">
          <h1 className="headerContainer animated slideInDown">
            <img className="profileImage"
              alt={userInfo.name}
              src={ userInfo.picture }/>
            <p className="headerContent">Welcome to your events, { userInfo.name }
            </p>
          </h1>
          <div className="newEvent">New Event</div>
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
