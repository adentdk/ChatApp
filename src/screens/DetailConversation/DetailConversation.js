import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    FlatList,
    Alert
} from 'react-native';
import { Input, Icon, Button, Overlay, ListItem } from 'react-native-elements';

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
                details : result.data[0]
            })

            
        }).catch(err => {
            Alert.alert('','error')
            console.log(err);
            
        })
    }

    render() {
        if(this.state.details.length < 1)
        {
            return <View />
        }
        return(
            <View style={[GlobalStyles.containerFlexStart,{backgroundColor:'white'}]}>
                <ListItem subtitle={"GroupMember"} containerStyle={{height:30,borderBottomWidth:0.4}}/>
                <FlatList keyExtractor={(item, index) => index.toString()}
                    data={this.state.details.group.users}
                    renderItem={({ item }) =>
                       <ListItem title={item.name} />
                    }
                />
            </View>
            
        )
    }

}

export default DetailConversation
