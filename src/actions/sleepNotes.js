import { AsyncStorage } from 'react-native';

export const REQUEST_NOTES = 'REQUEST_NOTES';
export const RECEIVE_NOTES = 'RECEIVE_NOTES';

const STORAGE_KEY = '@SleepRecord:key';

export function getNotes() {
  return async dispatch => {
    dispatch(requestNotes());

    try { 
      let keys = await AsyncStorage.getAllKeys();
      let values = await AsyncStorage.multiGet(keys);

      console.log(values);

      if(values !== null) {
        let formatedValues = values.map((value) => {
          return JSON.parse(value[1]);
        });

        dispatch(receiveNotes(formatedValues));
      }      
    } catch (error) {
      console.log('Error: ' + error);
    }
  };
};

export function requestNotes() {
  return {
    type: REQUEST_NOTES
  };
};

export function receiveNotes(notes) {
  return {
    type: RECEIVE_NOTES,
    notes: notes
  };
};

export function removeNotes() {
  return async dispatch => {
    try { 
      let keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);   
    } catch (error) {
      console.log('Error: ' + error);
    }
  };
};