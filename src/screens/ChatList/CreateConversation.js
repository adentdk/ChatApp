import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Alert,
  FlatList
} from 'react-native';
import {Input,Icon, Button, ListItem} from 'react-native-elements';

import axios from 'axios';

import TopBar from '../../components/TopBar'

import {color} from '../../config/config';
import {GlobalStyles} from '../../styles/styles';
import {Navigation} from 'react-native-navigation'

class CreateConversation extends Component {
    state = {
        users : [],
        isLoading : false,
    }

    componentDidMount() {
        this._handleLoadUsers()
    }

    _handleLoadUsers = async () => {
        
        const token = await AsyncStorage.getItem('token')
        const config = {
            headers : {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            }
        }

        this.setState({
            isLoading : true
        })
        
        axios.get('http://192.168.0.18:3333/api/v1/users/',config)
        .then(result => {
            this.setState({
                isLoading : false,
                users : result.data
            })
        }).catch(error => {
            console.log(error)
            Alert.alert(
                '',
                'error'
            )
        })

    }

    _handelCreateConversation = async (id) => {
   	const token = await AsyncStorage.getItem('token')
	const config = {
		headers : {
		"Authorization" : `Bearer ${token}`
		}
	}

	axios.post('http://192.168.0.18:3333/api/v1/conversations/',{
		type : 'personal',
		partner : id
	},config)
	    .then(result => {
	    	Alert.alert(
		'',
		'conversation has been created',
		[
			{text:"Ok", onPress: () => {Navigation.dismissModal(this.props.componentId)} }
		])
		this.props.data()
	    })
	    .catch(error => {
		    Alert.alert(JSON.stringify(error.message),'Something went wrong')
	    })
	    
    }

    render(){
        return(
            <View style={GlobalStyles.containerFlexStart}>
                <TopBar screenName={"Create conversation"} />
                {
                    (this.state.users.length > 0) ?
                    
                    <FlatList
                     keyExtractor={(item,index)=> index.toString()}
                     data={this.state.users}
                     renderItem={({item}) => 
                        <TouchableHighlight onPress={() => {
                            Alert.alert(
                                '',
                                `start conversation with ${item.name} ?`,
                                [
                                    {text:"Cancel"},
                                    {text:"Yes", onPress: () => this._handelCreateConversation(item.id) }
                                ]
                            )
                        }}>
                            <ListItem leftAvatar={{source: require('../../img/user.png'), size:55 }}
                                    title={item.name}
                                    subtitle={`@${item.username}`}
                                    titleStyle={{fontSize:16,fontWeight:'500'}}
                                    containerStyle={{borderBottomWidth:0.5}}/>
                        </TouchableHighlight>
                     }
                    />
                    :
                    <Text>Loading</Text>
                }
            </View>
        )
    }
}

export default CreateConversation;
