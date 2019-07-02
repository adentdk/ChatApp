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

class ChatList extends Component {

    state = {
        conversation : [],
        isLoading : false
    }

    componentDidMount() {
        this._handleLoadConversation()
    }

    _handleLoadConversation = async () => {
        
        const token = await AsyncStorage.getItem('token');
        const config = {
            header : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        }

        this.setState({
            isLoading : true
        })
        
        axios.get('http://192.168.0.18:3333/api/v1/users/conversation',config)
        .then(result => {
            this.setState({
                isLoading : false,
                conversation : result.data
            })
            console.log(result.data);
            
        }).catch(error => {
            console.log(error)
        })

    }

    render(){
        return(
            <View style={GlobalStyles.containerCenter}>
                <TopBar screenName={"Chat"} />
            </View>
        )
    }
}

export default ChatList;