import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  AsyncStorage
} from 'react-native'
import {Input,Icon, Button} from 'react-native-elements'

import axios from 'axios'

import {Authenticated} from '../../router/router'

import {color} from '../../config/config'
import {GlobalStyles} from '../../styles/styles'

class Login extends Component {

  state = {
    emailValue : "",
    passwordValue : "",
    passwordHidden : true,
    isLoading : false
  }

  _handleLogin =  () => {
    this.setState({
      isLoading : true
    })
    const config = {
      headers : {
        "Content-Type" : "application/json"
      }
    }
    
    axios.post('http://192.168.0.18:3333/auth/login',{
      "email" : this.state.emailValue,
      "password" : this.state.passwordValue
    },config).then(result => {
      const data = result.data
      const token = data.accessToken.token
      AsyncStorage.setItem('token',token)
      setTimeout(() => {
        this.setState({
          isLoading : false
        })
        Authenticated()
      },500)

    }).catch(error => {
      console.log(error)
      Alert.alert(
        '',
        'Login failed, make sure your email and your password correct'
      )
    })
  }

  render(){
    return(
      <View style={[GlobalStyles.containerCenter,{backgroundColor:color.secondary}]}>

        <View style={styles.loginWrapper}>

          
          <Input placeholder={"Input your email"}
              placeholderTextColor={"#aaa"}
              keyboardType={"email-address"}
              value={this.state.emailValue}
              leftIcon={
                <Icon name={"user"} type={"antdesign"} color={"#999"} size={16} />
              }
              onChangeText={(text) => {
                  this.setState({
                    emailValue : text
                  })
              }}
              inputStyle={{color:"#999",fontSize:16}}
              inputContainerStyle={GlobalStyles.inputContainerStyle}
          />

          <Input placeholder={"Input your password"}
              secureTextEntry={this.state.passwordHidden}
              placeholderTextColor={"#aaa"}
              keyboardType={"default"}
              value={this.state.passwordValue}
              leftIcon={
                <Icon name={"lock"} type={"antdesign"} color={"#999"} size={16} />
              }
              onChangeText={(text) => {
                  this.setState({
                    passwordValue : text
                  })
              }}
              rightIcon={
                (this.state.passwordValue)
                ? 
                <Icon name={"eyeo"} type={"antdesign"} color={"#999"} size={16} containerStyle={{paddingRight:15}}
                  onPress={() => {
                    this.setState({
                      passwordHidden : !this.state.passwordHidden
                    })
                  }} /> 
                :
                <Icon />
              }
              inputStyle={{color:"#999",fontSize:16}}
              inputContainerStyle={GlobalStyles.inputContainerStyle}
          />

          <Button title="Login"

              onPress={this._handleLogin}

              containerStyle={{marginHorizontal:15,marginVertical:5}}
              buttonStyle={{borderRadius:10,backgroundColor:color.secondary}}/>
          
        </View>
        <View style={{paddingRight:15}}>
          <Text style={{textAlign:'right'}}>forgot password?</Text>
        </View>

        {/* Background */}
        <View style={[styles.backgroundTop]}>
          <View style={{padding:'20%'}}>
            <Text style={[GlobalStyles.screenTitle,GlobalStyles.textLight]}>Sign In</Text>
          </View>
        </View>
        <View style={styles.backgroundBottom}/>
        {/* End Background */}

      </View>
    )
  }

}

export default Login

const styles = StyleSheet.create({
  loginWrapper : {
    margin:10,
    paddingVertical:20,
    backgroundColor:"rgba(255,255,255,0.95)",
    borderWidth:0.2,
    borderColor:color.primary,
    zIndex:-1,
    borderRadius:5,
    shadowOffset:{
      width:1,
      height:1
    },
    shadowOpacity:1,
    shadowColor:"black"
  },
  backgroundTop : {
    backgroundColor:color.primary,
    position:'absolute',
    top:0,
    bottom:0,
    right:0,
    left:0,
    zIndex:-2
  },
  backgroundBottom : {
    backgroundColor:'white',
    position:'absolute',
    top:'50%',
    bottom:0,
    right:0,
    left:0,
    zIndex:-2,
    borderTopLeftRadius:40,
    borderTopRightRadius:40
  }
})


