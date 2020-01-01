import { Entypo } from '@expo/vector-icons';
import {ActionSheet, Root} from "native-base";
import * as React from 'react';
import {View, Alert} from "react-native";
import Color from "../../../common/Color"



const BUTTONS = ['削除する', 'キャンセルする', '編集する'];
const DELETE = 0;
const CANCEl = 1;


export default class EditDeleteButton extends React.Component {

    private onPress = () => {
        ActionSheet.show({
                options: BUTTONS,
                destructiveButtonIndex: 0,
                cancelButtonIndex: 1,
            }, this.onSelected)
    };

    private onSelected = (index: number) => {
        switch (index) {
            case DELETE:
                Alert.alert(
                    '本当に削除しますか？',
                    '',
                    [
                        {text: 'OK', onPress: () => console.warn('ok')},
                        {text: 'キャンセル', onPress: () => console.warn('cancel')}
                        ]
                );
                return;
            case CANCEl:
                console.warn('cancel')
                return;
            default: return;
        }
    };

    render() {
        return(
            <View>
                <Root>
                <Entypo
                    name="dots-three-vertical"
                    size={15}
                    color={Color.lightBlack}
                    onPress={this.onPress}
                />
                </Root>
            </View>
        )
    }
}
