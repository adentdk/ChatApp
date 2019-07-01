import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {Button,Icon} from 'react-native-elements';
import { Navigation } from 'react-native-navigation';

import {appName,color} from './src/config/config';
import {GlobalStyles} from './src/styles/styles';

class App extends Component {

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

        <Text style={GlobalStyles.screenTitle}>Welcome to {appName}</Text>

        <View style={GlobalStyles.row}>
          
          <Button title={""} icon={
            <Icon name={"login"} type={"antdesign"} color={"white"} />
          }
          buttonStyle={[GlobalStyles.circle,GlobalStyles.primary]}
            onPress={() => this.goToScreen('Login')}
          />

          <Button title={""} icon={
            <Icon name={"chat-processing"} type={"material-community"} color={"white"} />
          }
            buttonStyle={[GlobalStyles.circle,GlobalStyles.primary]}
            onPress={() => this.goToScreen('Chat')}
          />

          <Button title={""} icon={
            <Icon name={"user"} type={"antdesign"} color={"white"} />
          }
            buttonStyle={[GlobalStyles.circle,GlobalStyles.primary]}
            onPress={() => this.goToScreen('Profile')}
          />

          <Button title={""} icon={
            <Icon name={"picture"} type={"antdesign"} color={"white"} />
          }
            buttonStyle={[GlobalStyles.circle,GlobalStyles.primary]}
            onPress={() => this.goToScreen('Gallery')}
          />


        </View>

        <View style={GlobalStyles.row}>

          <Button title={""} icon={
            <Icon name={"speedometer"} type={"material-community"} color={"white"} />
          }
            buttonStyle={[GlobalStyles.circle,GlobalStyles.primary]}
            onPress={() => this.goToScreen('Dashboard')}
          />
          
          <Button title={""} icon={
            <Icon name={"home"} type={"antdesign"} color={"white"} />
          }
          buttonStyle={[GlobalStyles.circle,GlobalStyles.primary]}
            onPress={() => this.goToScreen('Home')}
          />

          <Button title={""} icon={
            <Icon name={"bell"} type={"material-community"} color={"white"} />
          }
            buttonStyle={[GlobalStyles.circle,GlobalStyles.primary]}
            onPress={() => this.goToScreen('Notification')}
          />

        </View>

      </View>
    )
  }

}

export default App;

const styles = StyleSheet.create({
  
})
