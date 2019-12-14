import * as React from 'react';
import {StyleSheet,Button, View} from "react-native";

type Props = {
    onPress:() => void;
}

const styles = StyleSheet.create({

})

export default class CommonButton extends React.Component<Props> {
    public render() {
        return(
            <View>
                <Button title='写真を追加' onPress={this.props.onPress}/>
            </View>
        )
    }
}
