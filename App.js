import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import {Button,Icon} from 'react-native-elements';
import { Navigation } from 'react-native-navigation';


import {Authenticated,UnAuthenticated} from './src/router/router'

import {appName,color} from './src/config/config';
import {GlobalStyles} from './src/styles/styles';

class App extends Component {

  constructor(){
    super()
    AsyncStorage.getItem('token',(err,value) => {
      console.log(value);
      console.log(err);
      if(value != null){
        Authenticated()
      }else{
	UnAuthenticated()
      }
    })
  }

  componentDidMount(){
   
  }

  goToScreen = (screen) => {
    Navigation.push(this.props.componentId,{
      component : {
        name : screen,
        options : {}
      }
    })
  }

  render(){
    return(
      <View style={GlobalStyles.containerCenter}>

        <View style={styles.imgWrapper}>
          <Image source={require('./src/img/Chat.png')} height={300} width={300} style={styles.img}/>
        </View>
       
      </View>
    )
  }

}

export default App;

const styles = StyleSheet.create({
  titleWraper : {
    marginTop:10
  },
  imgWrapper : {
    flex:1,
    padding:20,
    alignItems:'center',
    justifyContent:'center'
  },
  img : {
    height:300,
    width:300
  },
  buttonSignin : {
    height:50,
    borderRadius:0,
    backgroundColor:color.primary
  }
})
