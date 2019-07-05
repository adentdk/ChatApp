import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    FlatList
} from 'react-native';
import { Input, Icon, Button, Overlay } from 'react-native-elements';

import axios from 'axios';

import { color } from '../../config/config';
import { GlobalStyles } from '../../styles/styles';
import { Navigation } from 'react-native-navigation'


class DetailConversation extends Component {

    state = {
        details : []
    }

    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token')
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
        console.log(config);
        
        axios.get(`http://192.168.0.18:3333/api/v1/conversations/${this.props.conversationId}`,config)
        .then(result => {
            this.setState({
                details : result.data
            })
            
        }).catch(err => {
            alert.alert('','error')
            console.log(err);
            
        })
    }

    render() {
        return(
            
            <View style={GlobalStyles.containerFlexStart}>
                <Text>Details Conversation</Text>
            </View>
            
        )
    }

}

export default DetailConversation
