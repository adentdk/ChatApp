import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  AsyncStorage,
  Alert
} from 'react-native';
import { Icon,Overlay, ListItem } from 'react-native-elements';
import {Navigation} from 'react-native-navigation'
import { UnAuthenticated } from '../router/router';

class RightConversationButton extends Component {

    componentWillReceiveProps() {
        console.log(this.props.action);
    }

    render() {
    return (
        <View>
            <TouchableHighlight underlayColor={"rgba(255,255,255,0.1)"}
                        onPress={() => {
                            Navigation.push(this.props.componentId, {
                                component : {
                                    name : "DetailConversation"
                                }
                            })
                        }} style={{padding:15,position:'relative'}}>

                <View>
                    <Icon name={"dots-three-vertical"} type={"entypo"} color={"white"}></Icon>

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

export default RightConversationButton ;


