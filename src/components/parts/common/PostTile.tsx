import * as React from "react";
import {Card} from "react-native-elements";
import {StyleSheet, Text} from "react-native";
import {Component} from "react";


type Props = {
    content?: null | string
    time: string
}

export default class PostTile extends Component <Props> {
    render() {
        return(
           <Card>
               <Text>{this.props.content}</Text>
               <Text>{this.props.time}</Text>
           </Card>
        )
    }
}
