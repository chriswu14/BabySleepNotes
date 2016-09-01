import { START_WATCH, STOP_WATCH, RESET_WATCH } from '../actions/sleepRecorder';

const initialState = {
  isRunning: false,
  initialTime: null,
  startTime: null,
  stopTime: null
};

export default function sleepRecorder(state = initialState, action) {
  switch (action.type) {
    case START_WATCH:
      return {
        ...state,
        initialTime: !state.initialTime ? action.time : state.initialTime,
        isRunning: true,
        startTime: action.time,
        stopTime: null
      };

    case STOP_WATCH:
      return {
        ...state,
        isRunning: false,
        stopTime: action.time
      };

    case RESET_WATCH:
      return {
        ...state,
        initialTime: null,
        isRunning: false,
        startTime: null,
        stopTime: null
      };

    default:
      return state;
  }
};
