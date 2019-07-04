import { Navigation } from "react-native-navigation"
import App from "./App"
import Login from "./src/screens/Login/Login"
import ChatList from "./src/screens/ChatList/ChatList"
import CreateConversation from "./src/screens/ChatList/CreateConversation"
import ChatRoom from "./src/screens/ChatRoom/ChatRoom"
import Call from "./src/screens/Call/Call"
import Status from "./src/screens/Status/Status"
import SideMenu from "./src/components/SideMenu"

import {color} from "./src/config/config"

Navigation.registerComponent(`App`, () => App)
Navigation.registerComponent(`Login`, () => Login)
Navigation.registerComponent(`ChatList`, () => ChatList)
Navigation.registerComponent(`CreateConversation`, () => CreateConversation)
Navigation.registerComponent(`ChatRoom`, () => ChatRoom)
Navigation.registerComponent(`Call`, () => Call)
Navigation.registerComponent(`Status`, () => Status)
Navigation.registerComponent(`SideMenu`, () => SideMenu)

Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true,
      backgroundColor: color.primary
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












