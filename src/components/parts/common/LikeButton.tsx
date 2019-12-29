import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {StyleSheet,Button, View} from "react-native";
import Color from "../../../common/Color"

// type Props = {
//     like: boolean
// }

type Props = {
    isLiked: boolean
    onPress: (isLiked: boolean) => void
}


export default class LikeButton extends React.Component<Props> {

    render() {
        const {isLiked, onPress} = this.props;
        return(
            <View>
                <Ionicons
                    name="md-heart"
                    size={15}
                    color={isLiked ? Color.pink : Color.lightBlack}
                    onPress={() => onPress(isLiked)}
                />
            </View>
        )
    }
}
