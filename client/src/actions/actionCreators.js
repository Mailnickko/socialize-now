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
