import * as React from "react";
import {Card} from "react-native-elements";
import {Text, StyleSheet, View, TouchableOpacity, Image} from "react-native";
import LikeButton from "./LikeButton";
import Post from "../../../common/model/post/Post";
import EditDeleteButton from "./EditDeleteButton";
import {Body, Button, CardItem, Container, Content, Header, Icon, Left, Right, Thumbnail} from "native-base";


type Props = {
    post: Post,
    name: string
    content: string
    time?: string
    onPress:(post) => void
    userImage: string,
    delete:() => void
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
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: this.props.userImage}} />
                                <Body>
                                    <Text>{this.props.name}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                            <Text numberOfLines={4}>{this.props.content}</Text>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <LikeButton onPress={(isLiked) => isLiked ?
                                        this.setState({isLiked: true}) :
                                        this.setState({isLiked: false})}
                                        isLiked={this.state.isLiked}
                                    />
                                    <Text>12 Likes</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Text>{this.props.time}</Text>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <EditDeleteButton onDelete={() => this.props.delete()}/>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>

        )
    }
}
