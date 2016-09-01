import { RECEIVE_NOTES, REQUEST_NOTES } from '../actions/sleepNotes';
import { STOP_WATCH } from '../actions/sleepRecorder';

const initialState = {
  isFetching: false,
  needsReset: false,
  notes: []
};

export default function sleepNotes(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_NOTES:
      return {
        ...state,
        notes: action.notes,
        isFetching: false,
        needsReset: false
      };

    case REQUEST_NOTES:
      return {        
        ...state,
        isFetching: true,
        needsReset: false
      };

    case STOP_WATCH:
      return {        
        ...state,
        needsReset: true
      };
    default:
      return state;
  }
};
