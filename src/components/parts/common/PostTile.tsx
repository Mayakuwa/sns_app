import * as React from "react";
import {Card} from "react-native-elements";
import {StyleSheet, Text} from "react-native";
import {Component} from "react";
import LikeButton from "./LikeButton";
import User from "../../../common/model/user/User";


type Props = {
    content: null | string
    time: string
}

type State = {
    isLiked: boolean
}

export default class PostTile extends Component <Props, State> {
    public constructor(props, state) {
        super(props, state);
        this.state = {
            // 本当はnullにしたい
            isLiked: false
        }
    }

    render() {
        return(
           <Card>
               <Text>{this.props.content}</Text>
               <Text>{this.props.time}</Text>
               {/* おそらくこの書き方がよくない*/}
               <LikeButton
                   onPress={(isLiked) => !isLiked ? this.setState({isLiked: true}) : this.setState({isLiked: false})}
                   isLiked={this.state.isLiked}
               />
               {console.warn(this.state.isLiked)}
           </Card>
        )
    }
}
