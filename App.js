// import React , {Component}from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import MainScreen from './src/MainScreen';
import SettingScreen from './src/SettingScreen';
import Example from './src/Example';


// export default class App extends Component {
//  render() {
//   return (
//     <View style={{flex:1}}>
//         <LoginScreen />
//     </View>
//   );
//  }
// }

const AppNavigator = createStackNavigator({
  Home: {
    screen : Example,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen : SignupScreen,
    navigationOptions: {
      header: null
    }
  },
  Main: {
    screen : MainScreen,
    navigationOptions: {
      header: null
    }
  },
  Setting: {
    screen : SettingScreen,
    navigationOptions: {
      header : null
    },
  }
});

export default createAppContainer(AppNavigator);
