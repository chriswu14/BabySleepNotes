import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Stopwatch from '../components/Stopwatch';
import * as SleepRecorderActions from '../actions/sleepRecorder';

function mapStateToProps(state) {
  return {
    ...state.sleepRecorder,
    ...state.sleepNotes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SleepRecorderActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);
