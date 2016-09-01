import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import Menu from './Menu';

export default class extends Component {
  render(){
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
        ref="navigation"
        open={state.open}
        onOpen={()=>Actions.refresh({key:state.key, open: true})}
        onClose={()=>Actions.refresh({key:state.key, open: false})}
        type="displace"
        content={<Menu/>}
        tapToClose={true}
        openDrawerOffset={0.35}
        panCloseMask={0.35}
        negotiatePan={true}
        tweenHandler={(ratio) => ({
         main: { opacity:Math.max(0.54,1-ratio) }
      })}>
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
      );
  }
}