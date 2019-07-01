import { Navigation } from "react-native-navigation"
import App from "./App";
import Login from "./src/screens/Login";
import {color} from "./src/config/config";

Navigation.registerComponent(`App`, () => App);
Navigation.registerComponent(`Login`, () => Login);

Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true,
      backgroundColor: color.primary
    },
    layout : {
      backgroundColor : 'transparent',
    }  
});

Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            topTabs: {
              visible: true,
              children: [
                {
                  component: {
                    name: "App",
                    options: {
                      topTab: {
                        visible: true,
                        title: "Tab 1"
                      }
                    }
                  }
                },
                {
                  component: {
                    name: "Login",
                    options: {
                      topTab: { visible: true, title: "Tab 2" }
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }
  });

  // Navigation.setRoot({
  //   root: {
  //     bottomTabs: {
  //       options: {
  //         bottomTabs: {
  //         animate: true,
  //         titleDisplayMode:'alwaysHide'
  //         }
  //       },
  //       children: [
  //       {
  //         stack: {
  //           children: [{ component: {  name: 'Login' } }],
  //           options: {
  //             bottomTab: {
  //               animate: false,
  //               icon: require('./src/icons/icon1.png'),
  //               testID: 'FIRST_TAB_BAR_BUTTON'
  //             }
  //           }
  //         }
  //       },
  //       {
  //         stack: {
  //           children: [{ component: {  name: 'App' } }],
  //           options: {
  //             bottomTab: {
  //               icon: require('./src/icons/icon2.png'),
  //               testID: 'SECOND_TAB_BAR_BUTTON'
  //             }
  //           }
  //         }
  //       },
  //     ],
  //     },
  //   }
  // });

});