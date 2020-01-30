import * as React from 'react';
import {View, Text} from "react-native"
import {NavigationScreenProp} from "react-navigation";
import {WebView} from "react-native-webview";


type Props = {
    navigation: NavigationScreenProp<{}>;
}


export default class SettingDetailWebViewScreen extends React.Component <Props> {


    public render() {
        return(
            <View style={{flex: 1}}>
                <WebView source={{uri: this.props.navigation.state.params.url}}/>
            </View>
        )
    }
}
