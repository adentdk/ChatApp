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

import TopBar from '../../components/TopBar'

import { color } from '../../config/config';
import { GlobalStyles } from '../../styles/styles';
import { Navigation } from 'react-native-navigation'


class ChatRoom extends Component {

    constructor() {
        super()
        this.state = {
            conversation: {},
            chats: [],
            myId: null,
            isLoading: false,
            action: this._handleSendChat,
            actionText: 'Send',
            conversation_id: '',
            message: '',
            currentMessage: ''
        }
        setInterval(() => {
            this._handleLoadChats(this.props.conversation_id)
        }, 1500)
    }

    componentDidMount() {
        this.setState({
            conversation_id: this.props.conversation_id
        })
        this._handleLoadChats(this.props.conversation_id)
    }

    _handleLoadChats = async (id) => {
        const token = await AsyncStorage.getItem('token')
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }

        this.setState({
            isLoading: true
        })

        axios.get(`http://192.168.0.18:3333/api/v1/conversations/chat/${id}`, config)
            .then(result => {
                this.setState({
                    isLoading: false,
                    chats: result.data.chats,
                    conversation: result.data.conversation,
                    myId: result.data.myId
                })


            }).catch(error => {
                console.log(error)
                // Alert.alert(
                //     '',
                //     'error'
                // )
            })
    }

    _handleSendChat = async () => {
        const token = await AsyncStorage.getItem('token');

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
        this.setState({
            isLoading: true
        })

        axios.post('http://192.168.0.18:3333/api/v1/chats/', {
            "conversation_id": this.state.conversation_id,
            "message": this.state.message
        }, config)
            .then(result => {
                this.setState({
                    isLoading: false,
                    message: ''
                })
                setTimeout(() => {
                    this.scroll.scrollToEnd()
                }, 500)
                this._handleLoadChats(this.state.conversation_id)
            }).catch(error => {
                console.log(error)
                Alert.alert(
                    '',
                    'error'
                )
            })
    }

    _handleDeleteChat = async (id) => {
        const token = await AsyncStorage.getItem('token');

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
        this.setState({
            isLoading: true
        })

        axios.delete(`http://192.168.0.18:3333/api/v1/chats/${id}`, config)
            .then(result => {
                this.setState({
                    isLoading: false,
                })
                this._handleLoadChats(this.state.conversation_id)
            }).catch(error => {
                console.log(error)
                Alert.alert(
                    '',
                    'error'
                )
            })
    }

    _handleSetSendAction = () => {
        this.setState({
            message: '',
            currentMessage: '',
            actionText: 'Send',
            action: this._handleSendChat
        })
    }

    _handleSetEditAction = (message, id) => {
        this.setState({
            message: message,
            currentMessage: message,
            actionText: 'Edit',
            action: () => this._handleEditChat(id)
        })
    }

    _handleEditChat = async (id) => {
        const token = await AsyncStorage.getItem('token');

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
        this.setState({
            isLoading: true
        })

        axios.patch(`http://192.168.0.18:3333/api/v1/chats/${id}`, {
            "message": this.state.message
        }, config)
            .then(result => {
                this.setState({
                    isLoading: false,
                    action: this._handleSendChat,
                    message: '',
                    currentMessage: '',
                    actionText: 'Send'
                })
                this._handleLoadChats(this.state.conversation_id)
            }).catch(error => {
                console.log(error)
                Alert.alert(
                    '',
                    'error'
                )
            })
    }


    render() {
        const conversation = this.state.conversation
        const chats = this.state.chats


        return (

            <View style={GlobalStyles.containerFlexStart}>
                {

                    (conversation.length > 0 || chats.length > 0)

                        ?

                        <ScrollView style={{ backgroundColor: "transparent", flex: 1 }} ref={(c) => { this.scroll = c }}>
                            <View style={{ padding: 5 }}>
                                <FlatList keyExtractor={(item, index) => index.toString()}
                                    data={chats}
                                    renderItem={({ item }) =>
                                        <Messages chat_id={item.id}
                                            username={item.sender}
                                            message={item.message}
                                            user_id={item.user_id}
                                            timestamp={item.timestamp}
                                            myId={this.state.myId}
                                            _handleDeleteChat={this._handleDeleteChat}
                                            _handleSetEditAction={this._handleSetEditAction}
                                        />
                                    } />
                            </View>
                        </ScrollView>

                        :

                        <View style={{ flex: 1 }}>

                            <Text>Loading</Text>

                        </View>
                }
                <View>
                    {
                        (this.state.actionText == 'Edit')
                            ?
                            <View style={{ padding: 10, backgroundColor: color.secondaryT }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ textAlign: 'left', flex: 1, fontSize: 11 }}>editing message ...</Text>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={this._handleSetSendAction}>
                                        <Text style={{ textAlign: 'right', fontSize: 11 }}>cancel</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 11, fontWeight: '500' }}>curent message</Text>
                                    <Text style={{ fontSize: 16 }}>{this.state.currentMessage}</Text>
                                </View>
                            </View>
                            :
                            <View style={{ height: 0 }} />
                    }
                </View>
                <View style={{ height: 50, backgroundColor: "white" }}>
                    <Input placeholder={"type your message here .."}
                        value={this.state.message}
                        rightIcon={
                            <Icon name={"paper-plane"}
                                type={"entypo"}
                                color={color.other}
                                onPress={this.state.action}
                                disabled={
                                    (this.state.message == '')
                                        ?
                                        true
                                        :
                                        false
                                }
                                disabledStyle={{ backgroundColor: 'white' }}
                            />
                        }
                        onChangeText={(text) => {
                            this.setState({
                                message: text
                            })
                        }} />
                </View>
            </View>
        )



    }
}

export default ChatRoom;


class Messages extends Component {

    state = {
        overlayVisible: false,
        isMark: false,
    }

    _time = () => {
        let time = this.props.timestamp;
        time = time.split('T')[1];
        time = time.split(':');
        time = time[0] + ':' + time[1];
        return <Text style={{ fontSize: 10 }}>{time}</Text>;
    }

    render() {
        const alignItems = (this.props.myId == this.props.user_id) ? "flex-end" : "flex-start";
        const backgroundColor = (this.props.myId == this.props.user_id) ? color.other : 'white';
        const border = (this.props.myId == this.props.user_id) ? { borderBottomRightRadius: 0 } : { borderBottomLeftRadius: 0 }
        return (
            <View>
                <TouchableHighlight style={{ width: '100%' }} onLongPress={() => this.setState({ overlayVisible: true, })}
                    underlayColor={"rgba(0,0,0,.1)"}>
                    <View style={{
                        backgroundColor: (this.state.isMark) ? 'rgba(0,0,0,0.1)' : 'transparent'
                    }}>
                        <View style={{ alignItems: alignItems }}>
                            <View style={[{
                                maxWidth: '100%', minWidth: '70%',
                                padding: 10,
                                marginLeft: 4,
                                marginBottom: 5,
                                flexDirection: 'row',
                                backgroundColor: backgroundColor,
                                borderRadius: 20,
                            }, border]}>
                                <View style={{ flex: 4 }}>
                                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{this.props.username}</Text>
                                    <Text>{this.props.message}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    {this._time()}
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
                <View>
                    {
                        (this.props.myId == this.props.user_id)
                            ?
                            <Overlay isVisible={this.state.overlayVisible}
                                height={"auto"}
                                onBackdropPress={() => this.setState({ overlayVisible: false })}>
                                <TouchableOpacity onPress={() => {
                                    this.props._handleSetEditAction(this.props.message, this.props.chat_id)
                                    this.setState({
                                        overlayVisible: false,
                                    })
                                }}
                                    style={{ padding: 10 }}>
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    Alert.alert(
                                        '',
                                        'delete this message?',
                                        [
                                            { text: "cancel", onPress: () => this.setState({ overlayVisible: false }) },
                                            {
                                                text: "delete", onPress: () => {
                                                    this.props._handleDeleteChat(this.props.chat_id)
                                                    this.setState({ overlayVisible: false })
                                                }
                                            }
                                        ]
                                    )
                                }}
                                    style={{ padding: 10 }} >
                                    <Text>Delete</Text>
                                </TouchableOpacity>
                            </Overlay>
                            :
                            <View />
                    }
                </View>
            </View>
        )
    }
}
