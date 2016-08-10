// Place all action creators here
import axios from 'axios';
import * as types from './actionTypes';

export function sendMessage(username, message, eventId){
  let request = axios.post('/message', {username, message, eventId});
  return {
    type: types.SEND_MESSAGE,
    payload: request
  }
}

export function getMessages(eventId){
  let request = axios.get('/message', {eventId});
  return {
    type: types.GET_MESSAGES,
    payload: request
  }
}

//Grab all Events for a user
  //Assuming here that we're getting an array of objects
export function grabUserEvents(userId) {
  const userEvents = axios.get(`/user?id=${userId}`)
    .then(function(events) {
      return events;
    })
    .catch(function(err) {
      return err;
    });

  return {
    type: types.GET_USER_EVENTS,
    payload: userEvents
  };
}

>>>>>>> (feat) Add axios and basic action creator
