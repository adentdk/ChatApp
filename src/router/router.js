import {Navigation} from 'react-native-navigation';
import {color} from '../config/config'

export const Authenticated = () => Navigation.setRoot({
    root: {
      bottomTabs: {
        options: {
          bottomTabs: {
          animate: true,
          titleDisplayMode:'alwaysHide',
          backgroundColor: color.primary
          }
        },
        children: [
        {
          stack: {
            children: [{ component: {  name: 'ChatList' } }],
            options: {
              bottomTab: {
                icon: require('../icons/chat.png'),
                testID: 'FIRST_TAB_BAR_BUTTON'
              }
            }
          }
        },
        {
          stack: {
            children: [{ component: {  name: 'Status' } }],
            options: {
              bottomTab: {
                icon: require('../icons/status.png'),
                testID: 'SECOND_TAB_BAR_BUTTON'
              }
            }
          }
        },
        {
          stack: {
            children: [{ component: {  name: 'Call' } }],
            options: {
              bottomTab: {
                icon: require('../icons/phone.png'),
                testID: 'THIRD_TAB_BAR_BUTTON'
              }
            }
          }
        },
      ],
      },
    }
  });