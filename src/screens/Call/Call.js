import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import {Input,Icon, Button} from 'react-native-elements';

import axios from 'axios';

import TopBar from '../../components/TopBar'

import {color} from '../../config/config';
import {GlobalStyles} from '../../styles/styles';

class Call extends Component {

    render(){
        return(
            <View style={GlobalStyles.containerCenter}>
                <TopBar screenName={"Call"} />
            </View>
        )
    }
}

export default Call;