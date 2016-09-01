import { AsyncStorage } from 'react-native';

export const START_WATCH = 'START_WATCH';
export const STOP_WATCH = 'STOP_WATCH';
export const RESET_WATCH = 'RESET_WATCH';

const STORAGE_KEY = '@SleepRecord:key';

export function start(time) {
  return {
    type: START_WATCH,
    time: time
  };
};

export function stop(time) {
  return {
    type: STOP_WATCH,
    time: time
  };
};

export function reset() {
  return {
    type: RESET_WATCH
  };
};

export function stopAndSave(data) {
  return async dispatch => {
    dispatch(stop(data.stopTime));

    try {
      await AsyncStorage.setItem(JSON.stringify(data.note.initialTime), JSON.stringify(data.note));    
    } catch (error) {
      console.log('Error: ' + error);
    }
  };
};