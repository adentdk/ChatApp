import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  AsyncStorage,
  Alert
} from 'react-native';
import { Icon,Overlay, ListItem } from 'react-native-elements';
import { UnAuthenticated } from '../router/router';
import { Navigation } from 'react-native-navigation';

class RightButton extends Component {

  state = {
      menuVisible : false
  }


    _handleLogout = () => {
        AsyncStorage.removeItem('token')
        UnAuthenticated()
    }

    render() {
    return (
        <View>
            <TouchableHighlight underlayColor={"rgba(255,255,255,0.1)"}
                        onPress={() => {
                            (this.props.action == 'infoConversation')
                            ?
                            Navigation.push(this.props.parentComponentId,{
                                component : {
                                    name : "DetailConversation",
                                    passProps : {
                                        conversationId : this.props.conversationId
                                    },
                                    options : {
                                        topBar : {
                                            title : {
                                                text : "Detail Conversation"
                                            },
                                            rightButtons : null
                                            
                                        }
                                    }
                                }
                            })
                            :
                            this.setState({
                                menuVisible : true
                            })
                        }} style={{padding:15,position:'relative'}}>

                <View>
                    {
                          (this.props.action == 'infoConversation')
                          ?
                          <Icon name={"infocirlceo"} type={"antdesign"} color={"white"}></Icon>
                          :
                          <Icon name={"dots-three-vertical"} type={"entypo"} color={"white"}></Icon>
                    }

                    <View style={{width:'100%',height:'auto',position:'absolute'}}>    
                        <Overlay isVisible={this.state.menuVisible}
                            height={"auto"}
                            onBackdropPress={() => {
                                this.setState({
                                    menuVisible : false
                                })
                            }}
                            containerStyle={{
                                position:'absolute',
                                top:0,
                                right:0,
                            }}>
                            <View style={{backgroundColor:'white',borderWidth:.3}}>
                                <ListItem title={"Logout"} onPress={() => {
                                    Alert.alert(
                                        '',
                                        'logout?',
                                        [
                                            {text:"cancel"},
                                            {text:"logout", onPress:this._handleLogout}
                                        ]    
                                    )
                                }}/>
                            </View>
                        </Overlay>
                    </View>

                </View>

            </TouchableHighlight>
        </View>
    )
  }

}

export default RightButton ;


