import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import participantsReducer from './reducer_participants';
import nomineesReducer from './reducer_nominees';
import suggestionsReducer from './reducer_suggestions';
import singleUserReducer from './reducer_singleUser';

// Combine results from indiviual reducers into a single rooteReducer to be used in the store
const rootReducer = combineReducers({
  form,
  singleUser: singleUserReducer,
  participants: participantsReducer,
  nominees: nomineesReducer,
  suggestions: suggestionsReducer,
  routing: routerReducer
});

export default rootReducer;
