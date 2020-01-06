import * as React from 'react';
import {View, Text} from "react-native";
import {NavigationScreenProp} from "react-navigation";

type Props = {
    navigation: NavigationScreenProp<{}>;
}

export default class PostScreen extends React.Component<Props> {
    render() {
        return(
            <View>
                <Text>これはpostです</Text>
            </View>
        )
    }
}
