import React, { Component } from 'react';
import {
  Text,
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
            leftComponent={
              
              (this.props.componentId) ?
                <Icon name="arrowleft"
                      type="antdesign"
                      color="white" 
                      onPress={() => {
                      Navigation.pop(this.props.componentId)
                      {
                        (this.props.refreshing != null)
                        ?
                        this.props.refreshing()
                        :
                        () => {}
                      }
                  }}/> 
                : 
                <Text/>
            }
            centerComponent={{ text: this.props.screenName, style: { color: '#fff',fontSize:20 } }}
            containerStyle={[GlobalStyles.primary,styles.header]}
        />
    )
  }

}

export default TopBar;

const styles = StyleSheet.create({
  header : {
    position :'relative',
    top:0,
    right:0,
    left:0,
    height:60,
    padding:10,
    borderBottomWidth:0.5,
    borderBottomColor:color.secondary
  }
})


