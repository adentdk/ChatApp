import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import {Input,Icon, Button} from 'react-native-elements';

import axios from 'axios';


import {color} from '../config/config';
import {GlobalStyles} from '../styles/styles';
import { UnAuthenticated } from '../router/router';

class ChatList extends Component {

    _handleLogout = () => {
        AsyncStorage.removeItem('token')
        UnAuthenticated()
    }

    render(){
        return(
            <View style={GlobalStyles.containerCenter}>
                <Button title={"Logout"} onPress={this._handleLogout}/>
            </View>
        )
    }
}

export default ChatList;