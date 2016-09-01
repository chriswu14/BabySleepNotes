import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { formatDuration, formatTime, formatDate } from '../helpers/timeHelper';

export default class NoteBox extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    let dataSource = new ListView.DataSource({
      sectionHeaderHasChanged: this._sectionHeaderHasChanged,
      rowHasChanged: this._rowHasChanged,
    });

    let {data, sectionIds} = this._getListViewData(props.notes);

    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(data, sectionIds)
    };  
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.notes !== this.props.notes) {
      let {data, sectionIds} = this._getListViewData(nextProps.notes);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(data, sectionIds)
      })
    }
  }

  _getListViewData(notes) {
    let data = {};
    let sectionIds = [];
    
    notes.map((note) => {
      let section = formatDate(note.initialTime);
      if (sectionIds.indexOf(section) === -1) {
        sectionIds.push(section);
        data[section] = [];
      }
      data[section].push(note);
    });

    return {data, sectionIds};
  }

  _sectionHeaderHasChanged(oldSection, newSection) {
    return oldSection !== newSection;
  }

  _rowHasChanged(oldRow, newRow) {
    return oldRow !== newRow;
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <View style={styles.noteWrapper}>        
        <Text style={styles.noteSpan}>Start from {formatTime(rowData.initialTime)}</Text>
        <Text style={styles.noteDuration}>For {formatDuration(rowData.duration)}</Text>
      </View> 
    );
  }

  _renderSectionHeader(data, sectionId) {
    var text;
    return (
      <View>
        <Text>{sectionId}</Text>
      </View>
    );
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {    
    return (
      <View key={"SEP_" + sectionID + "_" + rowID}  style={styles.rowSeparator}/>
    );
  }

  render() {  
    let { notes } = this.props;
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderSectionHeader={this._renderSectionHeader}
        renderSeparator={this._renderSeparator}
      />      
    )
  }
}

const STORAGE_KEY = '@SleepRecord:key';
const styles = StyleSheet.create({
  noteWrapper: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  noteSpan: {
    fontSize: 20,
    fontWeight: '100'
  },
  noteDuration: {
    fontSize: 20,
    fontWeight: '100'
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginHorizontal: 10,
  },
});