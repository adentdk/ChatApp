import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Input,Icon, Button} from 'react-native-elements';

import {color} from '../config/config';
import {GlobalStyles} from '../styles/styles';

import TopBar from '../components/TopBar';

class Login extends Component {


  render(){
    return(
      <View style={GlobalStyles.containerCenter}>
        <TopBar componentId={this.props.componentId} screenName={"Login"} />
        <View style={styles.loginWrapper}>
          <View style={{padding:20}}>
              <Text style={GlobalStyles.screenTitle}>Login</Text>
          </View>
          <View>
              <Input placeholder={"Input your email"}
                  placeholderTextColor={"#aaa"}
                  keyboardType={"email-address"}
                  onChangeText={(text) => {
                      
                  }}
                  inputStyle={{color:"#666",fontSize:16}}
                  inputContainerStyle={GlobalStyles.inputContainerStyle}
              />
              <Input placeholder={"Input your password"}
                  secureTextEntry={true}
                  placeholderTextColor={"#aaa"}
                  keyboardType={"default"}
                  onChangeText={(text) => {
                      
                  }}
                  inputStyle={{color:"#666",fontSize:16}}
                  inputContainerStyle={GlobalStyles.inputContainerStyle}
              />
              <Button title="Login" containerStyle={{marginHorizontal:15,marginVertical:5}} buttonStyle={{borderRadius:10}}/>
          </View>
        </View>
      </View>
    )
  }

}

export default Login;

const styles = StyleSheet.create({
  loginWrapper : {
    margin:10,
    backgroundColor:"rgba(255,255,255,0.6)",
    zIndex:-1,
    borderRadius:5,
    shadowOffset:{
      width:1,
      height:1
    },
    shadowOpacity:1,
    shadowColor:"black"
  }
})


