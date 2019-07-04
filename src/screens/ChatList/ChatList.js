import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  AsyncStorage,
  TouchableHighlight,
  Alert,
  Image,
  RefreshControl
} from 'react-native'
import {Input,Icon, Button, ListItem,Overlay} from 'react-native-elements'

import axios from 'axios'
import moment from 'moment'

import { Navigation } from 'react-native-navigation';
import TopBar from '../../components/TopBar'

import {color} from '../../config/config'
import {GlobalStyles} from '../../styles/styles'

import{ModalNavigation} from '../../router/router'

class ChatList extends Component {

    state = {
        conversation : [],
        isLoading : false,
        menuVisible : false,
        refreshing : false,
    }

    componentDidMount() {
        this._handleLoadConversation()
    }

    _handleLoadConversation = async () => {
        
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
        
        axios.get('http://192.168.0.18:3333/api/v1/users/conversation',config)
        .then(result => {
            this.setState({
                isLoading : false,
                refreshing : false,
                conversation : result.data
            })
        }).catch(error => {
            console.log(error)
            this.setState({
                refreshing : false,
            })
            Alert.alert(
                '',
                'error'
            )
        })

    }

	_handleRefreshing = () => {
        
        this.setState({
            refreshing : true
        }, () => {
            this._handleLoadConversation()
        })
        
    }

    _handleDeleteConversation = async (id) => {
	    const token = await AsyncStorage.getItem('token')
	    const config = {
		    headers : {
			    "Authorization" : `Bearer ${token}`,
			    "Content-Type" : "aplication/json"
		  }
	    }

	    axios.delete(`http://192.168.0.18:3333/api/v1/conversations/${id}`,config)
		    .then(result => {
		    	Alert.alert('','conversation has been deleted')
			this._handleRefreshing()
		    })
		    .catch(error => {
		    	Alert.alert(JSON.stringify(error.message),'something went error')
		    })

    }

    render(){
        return(
            <View style={GlobalStyles.containerFlexStart}>
                <TopBar screenName={"Chat"}/>
                <FlatList keyExtractor={(item,index)=> index.toString()}
                          data={this.state.conversation}
                          refreshing={this.state.refreshing}
                          onRefresh={this._handleRefreshing}
                          renderItem={({item}) =>
                          <ConversationItem data={item} componentId={this.props.componentId}
                                _handleDeleteConversation={this._handleDeleteConversation}
                                _handleRefreshingConversation={this._handleRefreshing}/>
                        }
                        />

                <View style={{position:"absolute",bottom:20,right:20,backgroundColor:color.secondary,height:40,width:40,borderRadius:20}}>
                    <TouchableHighlight underlayColor={"rgba(0,0,0,.1)"}
                                        onPress={() => {
                                            this.setState({
                                                menuVisible : true
                                            })
                                        }}>
                        <Image source={require('../../icons/plus.png')} style={{height:40,width:40}}/>
                    </TouchableHighlight>
                </View>
                
                <Overlay isVisible={this.state.menuVisible}
                            height={"auto"}
                            onBackdropPress={() => this.setState({ menuVisible: false })}>
                    
                    <TouchableHighlight underlayColor={"rgba(0,0,0,0.1)"} style={{padding:10}}
                        onPress={() => {ModalNavigation(this._handleRefreshing)
                                this.setState({
                                    menuVisible : false
                                })
                        }}>
                        <Text>Create a new conversation</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={"rgba(0,0,0,0.1)"} style={{padding:10}}
                        onPress={() => {}}>
                        <Text>Create a new group</Text>
                    </TouchableHighlight>
                </Overlay>
                        

            </View>
        )
    }
}

export default ChatList

class ConversationItem extends Component {
    
    
    constructor() {
        super()
        this.state = {
            data  : [],
            chat  : [],
	    menuVisible : false,
        }
    }

    componentWillReceiveProps() {
        this.setState({
            data : this.props.data,
            chat : this.props.data.chat
        })
    }
    
    _chatDate = () => {
        const dateNow = moment().format('Y-mm-DD')
        if(this.state.chat.length > 0)
        {
            const chatDate = this.state.chat[0].created_at.split(' ')
            const date = chatDate[0].split('-');
            const time = chatDate[1].split(':')
            if(dateNow == chatDate[0] ){
                return `${time[0]}:${time[1]}`
            }else{
                return `${date[2]}-${date[1]}-${date[0]}`
            }
        }
    }

    render(){    
        if(this.state.data.length < 1) {
            return <Text>Loading</Text>
        }
        return(
	<View>
            <TouchableHighlight underlayColor={"#aaa"}
                onPress={() => {
                    Navigation.push(this.props.componentId,{
                        component : {
                            name : 'ChatRoom',
                            passProps : {
                                conversation_id : this.state.data.id,
                                _handleRefreshingConversation : this.props._handleRefreshingConversation
                            },
                            options : {
                                bottomTabs : {
                                    visible : false,
                                    drawBehind : true
                                }
                            }
                        },
                    })
                }}
		onLongPress={() => this.setState({menuVisible:true}) }>
                <ListItem title={
                            (this.state.data.type == 'personal') ?
                            this.state.data.partner
                            :
                            this.state.data.group
                        }
                        titleStyle={{fontSize:16,fontWeight:'500'}}
                        subtitle={
                            (this.state.chat.length > 0) ? 
                            this.state.chat[0].message
                            :
                            <Text style={{fontStyle:'italic'}}>empty chat</Text>
                        }
                        leftAvatar={{ source : 
                            (this.state.data.type == 'personal') ?
                            require('../../img/user.png')
                            :
                            require('../../img/group.png')
                        , size:55 }}
                        rightElement={
                            <View style={{alignItems:'flex-end'}}>
                                <Text>{this._chatDate()}</Text>
                            </View>
                        }
                        containerStyle={{borderBottomWidth:0.5}}
                />
            </TouchableHighlight>
	    <Overlay isVisible={this.state.menuVisible}
			height={"auto"}
			onBackdropPress={() => this.setState({menuVisible:false})}>
            <TouchableHighlight onPress={() => {Alert.alert(
                '',
                'are you sure?',
                [
                    {text:"cancel"},
                    {text:"yes", onPress: () => this.props._handleDeleteConversation(this.state.data.id)}
                ])
                this.setState({menuVisible : false})
                }}
                style={{padding:10}}>
                <Text>Delete Conversation</Text>
            </TouchableHighlight>
	    </Overlay>
	</View>
        )
    }
}
