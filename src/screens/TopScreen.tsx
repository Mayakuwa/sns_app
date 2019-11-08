import * as React from 'react';
import {StyleSheet} from "react-native";
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from "react-navigation";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import MypageScreen from "./menu/MypageScreen";
import TimelineScreen from "./menu/TimelineScreen";
import LikeScreen from "./menu/LikeScreen";
import Color from "../common/Color";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

/**
ボトムメニューは、createMaterialBottomTabNavigatorを作って、そのあと
 createAppContainerで読み込ませて、それをrenderさせている
 **/


const hoge = createMaterialBottomTabNavigator(
    {
        TimeLine: {
            screen: TimelineScreen,
            navigationOptions: {
                tabBarLabel: "タイムライン",
                tabBarColor: Color.navy,
                tabBarIcon: ({tintColor, focused}) => (
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
                tabBarLabel: 'お気に入り',
                tabBarColor: Color.navy,
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        size={25}
                        name={'heart'}
                        style={{color: tintColor}}/>
                )
            }
        },
        Mypage: {
            screen: MypageScreen,
            navigationOptions: {
                tabBarLabel: 'マイページ',
                tabBarColor: Color.navy,
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        size={25}
                        name={'user'}
                        style={{color: tintColor}}/>
                )
            }
        },

    },
    {
        shifting: true,
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
