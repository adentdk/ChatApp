import { Navigation } from 'react-native-navigation';
import { color } from '../config/config'

export const Authenticated = () => Navigation.setRoot({
  root: {    
      stack: {
        options : {
          topBar : {
            visible : true,
            drawBehind: false,
            background :{
               color :color.primary,
              translucent : false,
            }
          }
        },
        children: [
          { 
            component: { 
              name: 'ChatList',
              options : {
                topBar : {
                  title : {
                    text : "ChatList"
                  }
                }
              }
            } 
          }
        ],
      }
  }
})

export const UnAuthenticated = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: "Login"
          }
        },
      ]
    }
  }
})

export const ModalNavigation = (passProps) => Navigation.showModal({
  stack: {
    children: [{
      component: {
        name: 'CreateConversation',
        passProps: {
          data: passProps
        },
        options: {
          topBar: {
            title: {
              text: 'Modal'
            }
          }
        }
      }
    }]
  }
});

