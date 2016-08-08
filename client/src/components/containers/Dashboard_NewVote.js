import React, { Component } from 'react';
import '../../styles/css/temp.css';
import { reduxForm } from 'redux-form';
import * as actionCreators from '../../actions/actionCreators';

class NewEvent extends Component {

  handleFormSubmit(formProps) {
    //Fire off an action creator
  }

    //This will become better implemented once we have a connection to the back end
  renderAlert() {
    if (this.props.hasError) {
      return (
        <div>
          <strong>{ this.props.hasError }</strong>
        </div>
      )
    }
  }

  //State here will be handled by redux forms. Once again, will become possible to implement with connection to back end
  render() {
    const { handleSubmit, fields: { date, invitedUsers, priceRange } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset>
          <label>Date:</label>
          <input type="date" { ...date.input } />
          {date.touched && date.error && <div className="error">{date.error}</div>}
        </fieldset>
        <fieldset>
          <label>Invited Users:</label>
          <input type="text" { ...invitedUsers.input } />
          {invitedUsers.touched && invitedUsers.error && <div className="error">{invitedUsers.error}</div>}
        </fieldset>
        <fieldset>
          <label>Price Range:</label>
          <div>
            <input type="radio" { ...priceRange.input } value="10" checked={priceRange.value === "10"} /> $
          </div>
          <div>
            <input type="radio" { ...priceRange.input } value="30" checked={priceRange.value === "30"} /> $$
          </div>
          <div>
            <input type="radio" { ...priceRange.input } value="100" checked={priceRange.value === "100"} /> $$$
          </div>
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
    errors.date = 'Please enter a date';
  }

  if (!formProps.invitedUsers) {
    errors.invitedUsers = 'Events are more fun with more people';
  }

  if (!formProps.priceRange) {
    errors.priceRange = 'Please select a price range';
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
