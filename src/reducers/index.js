import { combineReducers } from 'redux';
import counter from './counter';
import sleepRecorder from './sleepRecorder';
import sleepNotes from './sleepNotes';
import routes from './routes';

const rootReducer = combineReducers({
  counter,
  sleepRecorder,
  sleepNotes,
  routes
});

export default rootReducer;
