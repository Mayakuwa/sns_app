import * as React from "react";
import {Card} from "react-native-elements";
import {Text, StyleSheet, View, TouchableOpacity} from "react-native";
import LikeButton from "./LikeButton";
import Post from "../../../common/model/post/Post";
import EditDeleteButton from "./EditDeleteButton";
import {Thumbnail} from "native-base";


type Props = {
    post: Post,
    name: string
    content: string
    time?: string
    onPress:(post) => void
    userImage: string
}

type State = {
    isLiked: boolean
}

const styles = StyleSheet.create({
    dot: {
        justifyContent: 'flex-end'
    },
    element: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default class PostTile extends React.Component <Props, State> {


    public constructor(props, state) {
        super(props, state);
        this.state = {
            // 本当はnullにしたい
            isLiked: false
        }
    }

    render() {
        return(
            <TouchableOpacity onPress={this.props.onPress}>
               <Card>
                <Text>{this.props.name}</Text>
                <Thumbnail source={{uri: this.props.userImage}}/>
                <Text numberOfLines={4}>{this.props.content}</Text>
                <Text>{this.props.time}</Text>
                {/* おそらくこの書き方がよくない*/}
                <View style={styles.element}>
                    <LikeButton
                        onPress={(isLiked) => !isLiked ? this.setState({isLiked: true}) :
                            this.setState({isLiked: false})}
                        isLiked={this.state.isLiked}/>
                        <EditDeleteButton onDelete={() => alert('good time!')}/>
                </View>
            </Card>
            </TouchableOpacity>
        )
    }
}
