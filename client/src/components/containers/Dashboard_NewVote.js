import React, { Component } from 'react';
import '../../styles/css/temp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actionCreators from '../../actions/actionCreators';

class NewEvent extends Component {

  handleFormSubmit(formProps) {
    //Fire off an action creator
  }

    //need to dive into details of how to get proper authentication working
  renderAlert() {
    if (this.props.hasError) {
      return (
        <div>
          <strong>{ this.props.hasError }</strong>
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields: { date, invitedUsers, priceRange } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset>
          <label>Date:</label>
          <input type="date" { ...date } />
          {date.touched && date.error && <div className="error">{date.error}</div>}
        </fieldset>
        <fieldset>
          <label>Invited Users:</label>
          <input type="text" { ...invitedUsers } />
          {invitedUsers.touched && invitedUsers.error && <div className="error">{invitedUsers.error}</div>}
        </fieldset>
        <fieldset>
          <label>Price Range:</label>
          <input type="text" { ...priceRange } />
          {priceRange.touched && priceRange.error && <div className="error">{priceRange.error}</div>}
        </fieldset>
        { this.renderAlert() }
        <button action="submit">Create Event</button>
      </form>
    );
  }
};

function validate(formProps) {
  const errors = {};

  if (!formProps.date) {
    errors.date = 'Please enter an date';
  }

  if (!Object.keys(formProps.invitedUsers)) {
    errors.password = 'Events are more fun with more people';
  }
  return errors;
}

function mapStateToProps(state) {
    //Not sure what kind of error we'd return here
  return {

  }
}

export default reduxForm({
  form: 'newEvent',
  fields: ['date', 'invitedUsers', 'priceRange'], validate
}, mapStateToProps, actionCreators)(NewEvent);
