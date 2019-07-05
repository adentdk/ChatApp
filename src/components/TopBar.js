import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Icon, Header } from 'react-native-elements';

import { color } from '../config/config'

import { GlobalStyles } from '../styles/styles';
import { Navigation } from 'react-native-navigation';

class TopBar extends Component {


  render() {
    return (
      <Header
        leftComponent={

          (this.props.componentId) ?
            <Icon name="arrowleft"
              type="antdesign"
              color="white"
              onPress={() => {
                (this.props.backAction != "modal")
                  ?
                  Navigation.pop(this.props.componentId)
                  :
                  Navigation.dismissModal(this.props.componentId)
                {
                  (this.props.refreshing != null)
                    ?
                    this.props.refreshing()
                    :
                    () => { }
                }
              }} />
            :
            <Text />
        }
        centerComponent={
          <TouchableHighlight onPress={
            (this.props.onScreenNamePress != null)
              ? this.props.onScreenNamePress()
              :
              () => { }
          }>
            <Text style={styles.screenTitle}>{this.props.screenName}</Text>
          </TouchableHighlight>
        }
        containerStyle={[GlobalStyles.primary, styles.header]}
      />
    )
  }

}

export default TopBar;

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    top: 0,
    right: 0,
    left: 0,
    height: 60,
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: color.secondary
  },
  screenTitle: {
    color: "#fff",
    fontSize: 18,
  }
})


