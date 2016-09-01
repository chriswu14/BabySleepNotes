import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {formatTime} from '../helpers/timeHelper';

export default class CurrentTime extends Component {
  constructor(props) {
    super(props);
  
    this.state = {      
      time: new Date()
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        time: new Date()
      });
    }, 500); 
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {   
    return (
      <View style={styles.timeWrapper}>
        <Text style={styles.time}>{formatTime(this.state.time)}</Text>
      </View>      
    )
  }
}

const styles = StyleSheet.create({
  timeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  time: {
    fontSize: 60,
    fontWeight: '100',
    fontFamily: 'Helvetica Neue'
  }
});