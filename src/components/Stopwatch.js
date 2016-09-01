import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { formatDuration, formatTime } from '../helpers/timeHelper';
import CurrentTime from './CurrentTime'

export default class Stopwatch extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      startTime: null,
      duration: null
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _handleStartStop() {
    let { start, stopAndSave, isRunning, initialTime } = this.props;
    let duration = this.state.duration;
    
    if(isRunning) {
      clearInterval(this.interval);

      // save the record in app store
      let note = {
        initialTime: initialTime,
        duration: this.state.duration
      };

      stopAndSave({
        stopTime: new Date(),
        note: note
      });

      return;
    }

    this.setState({
      startTime: new Date()
    },
    // save the start time in app store
    () => {
      start(this.state.startTime);
    });


    this.interval = setInterval(() => {
      this.setState({
        duration: new Date() - this.state.startTime + duration
      });
    }, 500);    
  }

  _handleReset() {
    let { reset, isRunning } = this.props;

    if(this.state.startTime && !isRunning) {
      this.setState({
        duration: null,
        startTime: null
      }, 
      () => {
        reset();
      });
    }
  }

  render() {
    let { start, stop, isRunning } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <CurrentTime/>
          <View style={styles.timeWrapper}>
            <Text style={styles.duration}>{formatDuration(this.state.duration)}</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.buttonWrapper}>
            <TouchableHighlight onPress={this._handleReset.bind(this)} underlayColor='#cfd3d6' style={styles.button}>
              <Text>Reset</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this._handleStartStop.bind(this)} underlayColor='#cfd3d6' style={styles.button}>
              <Text style={isRunning&&styles.stopBtn}>{isRunning ? 'Stop' : 'Start'}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  timeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  duration: {
    fontSize: 60,
    fontWeight: '100',
    fontFamily: 'Helvetica Neue'
  },
  top: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 10
  },
  bottom: {
    flex: 2
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 15,
    paddingBottom: 30
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "rgba(240,239,245,1)",
    justifyContent: 'center',
    alignItems: 'center'
  },
  stopBtn: {
    color: 'red'
  }
});