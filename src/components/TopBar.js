import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import {Icon,Header} from 'react-native-elements';

import {color} from '../config/config'

import {GlobalStyles} from '../styles/styles';
import { Navigation } from 'react-native-navigation';

class TopBar extends Component {


  render(){
    return(
        <Header 
            leftComponent={<Icon name="arrowleft" type="antdesign" color="white" onPress={() => {Navigation.pop(this.props.componentId)}}/>}
            centerComponent={{ text: this.props.screenName, style: { color: '#fff' } }}
            containerStyle={[GlobalStyles.primary,styles.header]}
        />
    )
  }

}

export default TopBar;

const styles = StyleSheet.create({
  header : {
    position :'absolute',
    top:0,
    right:0,
    left:0,
    height:60,
    padding:10,
    borderBottomWidth:0.5,
    borderBottomColor:color.secondary
  }
})


