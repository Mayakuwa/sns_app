import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {StyleSheet,Button, View} from "react-native";
import Color from "../../../common/Color"


export default class LikeButton extends React.Component {
    render() {
        return(
            <View>
                <Ionicons name="md-heart" size={15} color={Color.pink} />
            </View>
        )
    }
}
