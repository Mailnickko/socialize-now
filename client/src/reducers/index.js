import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import participantsReducer from './dummy_reducer_participants';
import nomineesReducer from './dummy_reducer_nominees';
import suggestionsReducer from './dummy_reducer_suggestions';
import singleUserReducer from './dummy_reducer_singleUser';
import chatReducer from './reducer_chat';
import userEventsReducer from './reducer_userEvents';

// Combine results from indiviual reducers into a single rooteReducer to be used in the store
const rootReducer = combineReducers({
  singleUser: singleUserReducer,
  participants: participantsReducer,
  nominees: nomineesReducer,
  suggestions: suggestionsReducer,
  routing: routerReducer,
  chat: chatReducer,
  userEvents: userEventsReducer
});

export default rootReducer;
