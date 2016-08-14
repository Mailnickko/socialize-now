// Place all action creators here
import axios from 'axios';
import * as types from './actionTypes';

// Attaches Authentication token to outgoing API requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('id_token') || null;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function sendMessage(username, message, eventId){
  let request = axios.post('/message', {username, message, eventId});
  return {
    type: types.SEND_MESSAGE,
    payload: request
  };
}

export function getMessages(eventId){
  let request = axios.get('/message', {eventId});
  return {
    type: types.GET_MESSAGES,
    payload: request
  };
}

//Grab all Events for a user
  //Assuming here that we're getting an array of objects
    //Will populate the List of Events in Dashboard Page
export function grabUserEvents() {
  let userEvents = axios.post('/events');
  return {
    type: types.GET_USER_EVENTS,
    payload: userEvents
  };
}

//grab user data by username. most likely retrieved from JWT
  //could also be subbed out to search by userID in the future
    //Will populate the header in Dashboard Page
export function grabUserInfo(username) {
  const userInfo = axios.get(`/getUserInfo/${username}`)
    .then(user => { return user })
    .catch(err => { return err });

  return {
    type: types.GET_USER_INFO,
    payload: userInfo
  };
}

//Create a new Event in the DB
  // Should expect a returned copy of the created Event Object
    //Might not even be necessary for this to be an action creator
      //Since the componentWillMount() will do another get req to DB
export function createNewEvent(newEventObj) {
  const newEvent = axios.post('/event', newEventObj)
    .then(event => { return event })
    .catch(err => { return err });

  return {
    type: types.CREATE_NEW_EVENT,
    payload: newEvent
  };
}

//Simply create an action detailing a type
  //Set to true in the reducer
export function startVote() {
  return {
    type: types.START_VOTING
  };
}

//Simply create an action detailing a type
  //Set to true in the reducer
export function setWinningResult(highestVote) {
  return {
    type: types.SET_WINNING_RESULT,
    payload: highestVote
  };
}

export function increaseVote(index) {
  return {
    type: types.INCREASE_VOTE,
    index
  };
}

export function decreaseVote(index) {
  return {
    type: types.DECREASE_VOTE,
    index
  };
}

//Action Creators for authentication
export function userLogout() {
  return {
    type: types.LOGOUT_SUCCESS
  };
}

export function userLoginSuccess(profile, token) {
  const newUser = axios.post('/user', profile)
      .then(user => { return user })
      .catch(err => { return err });
  return {
    type: types.LOGIN_SUCCESS,
    profile,
    token
  };
}

export function userLoginError(err) {
  return {
    type: types.LOGIN_ERROR,
    errorMessage: err
  };
}

