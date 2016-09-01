import React, { Component } from 'react';
import { TouchableHighlight, Text, AsyncStorage, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SleepNotesActions from '../actions/sleepNotes';
import NoteBox from '../components/NoteBox'

export default class SleepNotes extends Component {  
  constructor(props) {
    super(props);

    this.state = {
        isFirstRender: true
    };
  }

  componentWillMount() {
    this.props.getNotes();
  }

  componentDidMount() {
    this.setState({ isFirstRender: false });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.needsReset) {
      this.props.getNotes();
    }
  }

  render() {
    let { notes, isFetching, removeNotes } = this.props

    const isLoading = isFetching || this.state.isFirstRender;

    return (
      <View>
      <TouchableHighlight onPress={removeNotes}>
        <Text>Remove notes</Text>
      </TouchableHighlight>
      { !isLoading && <NoteBox notes={notes}/> }
    </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.sleepNotes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SleepNotesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SleepNotes);
