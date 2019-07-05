import { Navigation } from "react-native-navigation"
import App from "./App"
import Login from "./src/screens/Login/Login"
import ChatList from "./src/screens/ChatList/ChatList"
import CreateConversation from "./src/screens/ChatList/CreateConversation"
import DetailConversation from "./src/screens/DetailConversation/DetailConversation"
import ChatRoom from "./src/screens/ChatRoom/ChatRoom"
import SideMenu from "./src/components/SideMenu"
import RightButton from "./src/components/RightButton"

import {color} from "./src/config/config"

Navigation.registerComponent(`App`, () => App)
Navigation.registerComponent(`Login`, () => Login)
Navigation.registerComponent(`ChatList`, () => ChatList)
Navigation.registerComponent(`CreateConversation`, () => CreateConversation)
Navigation.registerComponent(`DetailConversation`, () => DetailConversation)
Navigation.registerComponent(`ChatRoom`, () => ChatRoom)
Navigation.registerComponent(`RightButton`, () => RightButton)
Navigation.registerComponent(`SideMenu`, () => SideMenu)

Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true,
      background :{
        color :color.primary,
        translucent : false,
      },
      title : {
        color : color.light
      },
      backButton : {
        color : color.light
      },
      rightButtons : {
        id : "rightButtons",
        component : {
          name : "RightButton",
          passProps : {
            originComponentId : this.component
          }
        }
      }
    },
    layout : {
      backgroundColor : 'transparent',
    }  
})

Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setRoot({

    root: {
      stack: {
          id: 'App',
          children: [
            {
              component: {
                  name: "App"
              }
            },
          ]
      }
    }
  })

})












