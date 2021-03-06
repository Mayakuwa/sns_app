import * as React from 'react';
import {StyleSheet, Button, Text} from "react-native";
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from "react-navigation";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MypageScreen from "./menu/MypageScreen";
import TimelineScreen from "./menu/TimelineScreen";
import ProfileEditScreen from "./menu/ProfileEditScreen";
import AskScreen from "./AskScreen";
import LikeScreen from "./menu/LikeScreen";
import Color from "../common/Color";
import PostScreen from "./PostScreen";
import ArticleScree from "./menu/ArticleScreen";
import SettingDetailWebViewScreen from "./menu/SettingDetailWebView";


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
                Article: {
                    screen: ArticleScree,
                    navigationOptions: {
                        tabBarLabel: '記事',
                        tabBarColor: Color.navy,
                        tabBarIcon: ({tintColor, focused}) => (
                            <Entypo
                                size={20}
                                name={'news'}
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
                navigationOptions: {
                    // headerRight:
                    //     <Button
                    //         title="投稿する"
                    //         style={{marginRight: 20}}
                    //         onPress={() => console.log("hi")}
                    //     />
                }
            },
           ProfileEdit: {
                screen: ProfileEditScreen,
               navigationOptions: {
                   // headerRight:
                   //     <Button
                   //         title="投稿する"
                   //         style={{marginRight: 20}}
                   //         onPress={() => console.log("hi")}
                   //     />
               }
           },
           Post: {
                screen:　PostScreen
           },
           SettingDetailWebView: {
                screen: SettingDetailWebViewScreen
           }
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
