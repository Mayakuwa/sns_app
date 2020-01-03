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
import Storage from "./src/api/Storage";


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
      screen: TopScreen,
        navigationOptions: {
          //ヘッダーが被ってしまい変な挙動になるので非表示
          header: null
        }
    },
    Login: {
      screen: LoginScreen
    },
    Signup: {
        screen: SignupScreen
    }
  },
    {
      initialRouteName: ''}

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

type State = {
    userId: string | null
}

export default class App extends React.Component<State> {

    public constructor(props, state) {
        super(props, state);
        this.state = {
            userId: ''
        }
    }

    public componentDidMount() {
        /*
        ユーザーを取得して取れなかったらuserIdをnullのまま
         */
        const storage = new Storage()
        storage.load(Storage.KEY_USER_ID)
            .then(id => {
                this.setState({userId: id})
            })
            .catch((error) => {
                return error
            })
    }

    public render() {
        return this.state.userId ?
            <TopScreen/> :
            <IntroductionContainer/>;

  }
}

