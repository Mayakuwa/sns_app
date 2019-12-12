import * as React from 'react';
import {StyleSheet,Button, View} from "react-native";


const styles = StyleSheet.create({

})

export default class CommonButton extends React.Component {
    public render() {
        return(
            <View>
                <Button title='プロフィールを編集' onPress={() => alert('プロフィールを編集')}/>
            </View>
        )
    }
}
