import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import chatReducer from './reducer_chat';
import userEventsReducer from './reducer_userEvents';
import authReducer from './reducer_auth';
import voteStatus from './reducer_eventVoteStatus';
import userInfo from './reducer_userInfo';
import eventReducer from './reducer_event';
import userStatus from './reducer_userStatus';
import participants from './reducer_participants';
import pinnedMessages from './reducer_pinnedMessages';
import pinnedStatus from './reducer_pinnedStatus';


// Combine results from indiviual reducers into a single rooteReducer to be used in the store
const rootReducer = combineReducers({
  participants: participants,
  routing: routerReducer,
  chat: chatReducer,
  userEvents: userEventsReducer,
  voteStatus: voteStatus,
  auth: authReducer,
  userInfo: userInfo,
  event: eventReducer,
  userStatus: userStatus,
  pinnedMessages: pinnedMessages,
  pinnedStatus: pinnedStatus
});

export default rootReducer;
