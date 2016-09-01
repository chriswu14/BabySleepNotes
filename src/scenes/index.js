import React from 'react';
import { Actions, ActionConst, Scene } from 'react-native-router-flux';
import Drawer from '../components/Drawer';
import SleepRecorder from '../containers/SleepRecorder';
import SleepNotes from '../containers/SleepNotes';

const scenes = Actions.create(
   <Scene key="root">
    <Scene key="drawer" component={Drawer} open={false}>
      <Scene key="main" tabs={true} unmountScenes={true}>
        <Scene key="recordSleep" component={SleepRecorder} title="Record sleep"  sceneStyle={{paddingTop: 64}}/>
        <Scene key="sleepNotes" component={SleepNotes} title="Sleep notes"  sceneStyle={{paddingTop: 64}}/>                   
      </Scene>
    </Scene>
  </Scene>
)

export default scenes