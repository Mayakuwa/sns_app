import * as React from 'react';
import {StyleSheet, Button, Text} from "react-native";
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from "react-navigation";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import MypageScreen from "./menu/MypageScreen";
import TimelineScreen from "./menu/TimelineScreen";
import AskScreen from "./AskScreen";
import LikeScreen from "./menu/LikeScreen";
import Color from "../common/Color";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

/**
ボトムメニューは、createMaterialBottomTabNavigatorを作って、そのあと
 createAppContainerで読み込ませて、それをrenderさせている
 **/




export default class TopScreen extends React.Component {
    private navigator;

    private bottomNavigator = () => {
        const navigator = createMaterialBottomTabNavigator(
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
        );

        // タブのヘッダー文字設定。navigation.state.routesでルート名前を取り出してスイッチで条件分岐
        navigator.navigationOptions = ({navigation}) => {
            const {routeName} = navigation.state.routes[navigation.state.index];
            switch (routeName) {
                case "TimeLine":
                    return {
                        headerTitle: 'タイムライン',
                };
                case "Like":
                    return {
                        headerTitle: 'お気に入り',
                        headerBackTitle: null,
                        headerStyle: {
                            borderBottomWidth: 0,
                        }
                    };
                case "Mypage":
                    return {
                        headerTitle: 'マイページ',
                        headerBackTitle: null,
                        headerStyle: {
                            borderBottomWidth: 0,
                        }
                    };
            }
            return {headerTitle: ""};
        }

        return navigator;
    }



    private getNavigator = () => {
       return createStackNavigator( {
            Main: {
                screen: this.bottomNavigator(),
            },
            Ask: {
                screen: AskScreen,
            },

        }, {
           initialRouteName: 'Main'
           }
       )
    }



    public render() {
        const Container = createAppContainer(
            this.getNavigator()
        )

        return(
           <Container
            style={styles.container}
            ref={nav => {
                this.navigator = nav;
            }}
           />
        )
    }
}
