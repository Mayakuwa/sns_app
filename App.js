import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Color from "./src/common/Color";
import TopScreen from "./src/screens/TopScreen";
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from "react-navigation";


const IntroductionStack = createStackNavigator({
  Top: {
    screen: TopScreen
  }
})

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
  render() {
    return <IntroductionContainer/>;
  }
}

