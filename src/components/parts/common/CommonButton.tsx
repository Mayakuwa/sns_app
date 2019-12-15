import * as React from 'react';
import {StyleSheet,Button, View} from "react-native";

type Props = {
    title: string
    onPress:() => void;
}

const styles = StyleSheet.create({

})

export default class CommonButton extends React.Component<Props> {
    public render() {
        return(
            <View>
                <Button title={this.props.title} onPress={this.props.onPress}/>
            </View>
        )
    }
}
