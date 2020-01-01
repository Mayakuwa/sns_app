import { Entypo } from '@expo/vector-icons';
import * as React from 'react';
import {View} from "react-native";
import Color from "../../../common/Color"


type Props = {
    onPress: () => void
}


export default class EditDeleteButton extends React.Component<Props> {

    render() {
        return(
            <View>
                <Entypo
                    name="dots-three-vertical"
                    size={15}
                    color={Color.lightBlack}
                    onPress={this.props.onPress}
                />
            </View>
        )
    }
}
