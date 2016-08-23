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
  let request = axios.post('/getmessage', {eventId});
  return {
    type: types.GET_MESSAGES,
    payload: request
  };
}

export function getPinnedMessages(eventId){
  let request = axios.get(`/getPinnedMessages?eventId=${eventId}`, {eventId});
  return dispatch => {
    request
      .then( ({data}) => {
        dispatch({
          type: types.GET_PINNED_MESSAGES,
          payload: data
        })
      });
  };
}

export function togglePin(messageId, eventId){
  let request = axios.put('/togglePin', {messageId, eventId});
  return {
    type: types.TOGGLE_PIN,
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
    payload: Promise.resolve(userEvents)
  };
}

//grab user data by username. most likely retrieved from JWT
  //could also be subbed out to search by userID in the future
    //Will populate the header in Dashboard Page
export function grabUserInfo() {
  const userInfo = axios.post('/userinfo');
  return {
    type: types.GET_USER_INFO,
    payload: Promise.resolve(userInfo)
  };
}

export function getUserStatus(users){
  return {
    type: types.GET_USER_STATUS,
    payload: users
  }
}

export function getParticipants(eventId) {
  //Expecting to receive that created event back
  let getParticipant = axios.post('/participants', [eventId]);
  return (dispatch) => {
    getParticipant
      .then((userList) => {
        dispatch({
          type: types.GET_PARTICIPANTS,
          payload: userList.data
        });
      });
  }
}

//Create a new Event in the DB
  // Should expect a returned copy of the created Event Object
    //Might not even be necessary for this to be an action creator
      //Since the componentWillMount() will do another get req to DB
export function createNewEvent(constraints) {
  //Expecting to receive that created event back
  let newEvent = axios.post('/event', constraints);
  return (dispatch) => {
    newEvent
      .then((newEvent) => {
        dispatch({
          type: types.CREATE_NEW_EVENT,
          payload: newEvent.data
        });
      });
  }
}

export function getEvent(eventId) {
  //Expecting to receive that created event back
  let findEvent = axios.post('/findevent', [eventId]);
  return (dispatch) => {
    findEvent
      .then((event) => {
        dispatch({
          type: types.FIND_EVENT,
          payload: event.data
        });
      });
  }
}

export function inviteUser(userId, inviteeEmail, eventId) {
  let inviteUser = axios.post('/inviteUser', {userId, inviteeEmail, eventId});
  return dispatch => {
    inviteUser
      .then( res => {
        dispatch({
          type: types.INVITE_USER
        });
      });
  };
};

//Simply create an action detailing a type
  //Set to true in the reducer
export function startVote(eventId) {
  let updateEvent = axios.put('/startVote', [ eventId ]);

  return (dispatch) => {
    updateEvent
      .then(({data}) => {
        dispatch({
          type: types.START_VOTING,
          payload: data
        })
      });
  };
}

export function endVote(winningEvent, eventId) {
  let updateEvent = axios.put('/endVote', { winningEvent, eventId });

  return (dispatch) => {
    updateEvent
      .then(({data}) => {
        dispatch({
          type: types.END_VOTING,
          payload: data
        })
      });
  };
}

//Simply create an action detailing a type
  //Set to true in the reducer
// export function setWinningResult(winningEvent, eventId) {
//   let updateEvent = axios.put('/setWinner', { winningEvent, eventId });
//   return {
//     type: types.SET_WINNING_RESULT,
//     payload: highestVote
//   };
// }

export function increaseVote(index, eventId) {
  let upVoteSuggestion = axios.put('/upvote', { index, eventId});

  return (dispatch) => {
    upVoteSuggestion
      .then(({data}) => {
        dispatch({
          type: types.INCREASE_VOTE,
          payload: data
        })
      });
  };
}

export function decreaseVote(index, eventId) {
  let downVoteSuggestion = axios.put('/downvote', { index, eventId});

  return (dispatch) => {
    downVoteSuggestion
      .then(({data}) => {
        dispatch({
          type: types.DECREASE_VOTE,
          payload: data
        })
      });
  };
}

//Action Creators for authentication
export function userLogout() {
  return {
    type: types.LOGOUT_SUCCESS
  };
}

export function userLoginSuccess(profile, token) {

  let newUser = axios.post('/user', profile);

  return (dispatch) => {
    newUser
      .then(({user}) => {
        dispatch({
          type: types.LOGIN_SUCCESS,
          profile,
          token
        })
      })
  }
}

export function userLoginError(err) {
  return {
    type: types.LOGIN_ERROR,
    errorMessage: err
  };
}

