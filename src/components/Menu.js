import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Menu extends Component {
  _handlePress(key) {
    Actions[key]();
    this.context.drawer.toggle();
  }
  
  render() {  
    return (
      <View style={styles.menuWrapper}>
        <TouchableHighlight onPress={this._handlePress.bind(this, 'recordSleep')}>
          <Text style={styles.menuItem}>Record sleep</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._handlePress.bind(this, 'sleepNotes')}>
          <Text style={styles.menuItem}>Sleep notes</Text>
        </TouchableHighlight>
      </View>      
    )
  }
}

Menu.contextTypes = {
  drawer: PropTypes.object
};

const styles = StyleSheet.create({
  menuWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    paddingTop: 64
  },
  menuItem: {
    fontSize: 30,
    fontWeight: '100'
  }
});