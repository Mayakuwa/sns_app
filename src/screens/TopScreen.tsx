import * as React from 'react';
import {StyleSheet} from "react-native";
import {View,Text} from "react-native";
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from "react-navigation";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import MypageScreen from "./MypageScreen";
import TimelineScreen from "./TimelineScreen";
import LikeScreen from "./LikeScreen";
import Color from "../common/Color";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const hoge = createMaterialBottomTabNavigator(
    {
        TimeLine: {
            screen: TimelineScreen,
            navigationOptions: {
                tabBarLabel: "タイムライン",
                tabBarColor: Color.navy,
                tabBarIcon: ({tintColor}) => (
                    <Icon
                        size={25}
                        name={'home'}
                        style={{color: tintColor}}/>
                )
            }
        },
        Mypage: {
            screen: MypageScreen,
            navigationOptions: {
                tabBarLabel: 'マイページ',
                tabBarColor: Color.navy,
                tabBarIcon: ({tintColor}) => (
                    <Icon
                        size={25}
                        name={'home'}
                        style={{color: tintColor}}/>
                )
            }
        },
        Like: {
            screen: LikeScreen,
            navigationOptions: {
                tabBarLabel: 'マイページ',
                tabBarColor: Color.navy,
                tabBarIcon: ({tintColor}) => (
                    <Icon
                        size={25}
                        name={'home'}
                        style={{color: tintColor}}/>
                )
            }
        },
    }
)

const Container = createAppContainer(hoge);

export default class TopScreen extends React.Component {

    public render() {
        return(
           <Container
            style={styles.container}
           />
        )
    }
}
