/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { Router } from 'react-native-router-flux';
import { connect } from 'react-redux';
import configureStore from './src/store/configureStore';
import scenes from './src/scenes'

const store = configureStore();
const RouterWithRedux = connect()(Router);

class BabySleepNote extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux scenes={scenes}/>     
      </Provider>
    );
  }
}

AppRegistry.registerComponent('BabySleepNote', () => BabySleepNote);
