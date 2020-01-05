import { Entypo } from '@expo/vector-icons';
import {ActionSheet, Root} from "native-base";
import * as React from 'react';
import {View, Alert} from "react-native";
import Color from "../../../common/Color"



const BUTTONS = ['削除する', 'キャンセルする', '編集する'];
const DELETE = 0;
const CANCEl = 1;


type Props = {
    onDelete: () => void
}

export default class EditDeleteButton extends React.Component <Props> {

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
                        {text: 'OK', onPress: () => this.props.onDelete()},
                        {text: 'キャンセル', onPress: () => {return null}}
                        ]
                );
                return;
            case CANCEl:
                return null;
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
