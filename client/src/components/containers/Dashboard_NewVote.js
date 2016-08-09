import React, { Component } from 'react';
import '../../styles/css/temp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';

class NewEvent extends Component {

  constructor(props) {
    super(props);
  }

  //Hate to do it this way..very hacky but redux forms is giving us some trouble
    //This should work for no until we come up with a better solution
  makeEvent(e) {
    e.preventDefault();
    let sendObj = {
      date: e.target.date.value,
      invitees: e.target.invitedUsers.value.split(','),
      priceRange: e.target.priceRange.value
    };

    //would call an action creator at this point using this data
  }

  render() {
    return (
      <form onSubmit={this.makeEvent.bind(this)}>
          <label>Date:</label>
          <input type="date" placeholder="Date" name="date" />
          <label>Invited Users:</label>
          <input type="text" name="invitedUsers" />
          <label>Price Range:</label>
          <select name="priceRange">
            <option value="10">$</option>
            <option value="30">$$</option>
            <option value="100">$$$</option>
          </select>
        <button action="submit">Create Event</button>
      </form>
    );
  }
};

function mapStateToProps(state) {
    //Not sure what kind of error we'd return here
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);

