import React, {Component} from 'react'
import {View,Text} from "react-native"
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import Mypage from "./Mypage"
import Timeline from "./Timeline"




export default class TopScreen extends Component {
    // private hogehoge() {
    //     const hoge = createMaterialBottomTabNavigator({
    //         MyPage: { screen: Mypage },
    //         Timeline: { screen: Timeline },
    //     }, {
    //         initialRouteName: 'MyPage',
    //         activeColor: '#F44336',
    //     });
    // }
    render() {
        return(
            <View>
               <Text>あh</Text>
            </View>
        )
    }
}
