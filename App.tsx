import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Color from "./src/common/Color";
import TopScreen from "./src/screens/TopScreen";
import LoginScreen from "./src/screens/login/LoginScreen";
import SignupScreen from "./src/screens/login/SignupScreen";
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from "react-navigation";
import * as firebase from "firebase";
import ENV from "./env.json";



require("firebase/firestore");

const config = {
    apiKey: ENV.FIREBASE_API_KEY,
    authDomain: ENV.FIREBASE_AUTH_DOMAIN,
    databaseURL: ENV.FIREBASE_DB_URL,
    projectId: ENV.FIREBASE_PRJ_ID,
    storageBucket: ENV.FIREBASE_STORAGE,
    messagingSenderId: ENV.FIREBASE_MSG_SEND_ID,
    appId: ENV.FIREBASE_APP_ID,
    measurementId: ENV.FIREBASE_MSG_ID
};

firebase.initializeApp(config);


const IntroductionStack = createStackNavigator({
    Top: {
      screen: TopScreen
    },
    Login: {
      screen: LoginScreen
    },
    Signup: {
        screen: SignupScreen
    }
  },
    {
      initialRouteName: 'Signup'}

)

const IntroductionContainer = createAppContainer(IntroductionStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends React.Component {
  public render() {
    return (
        <IntroductionContainer/>
    )
  }
}

