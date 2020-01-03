import * as React from "react";
import {Card} from "react-native-elements";
import {Text, StyleSheet, View} from "react-native";
import LikeButton from "./LikeButton";
import EditDeleteButton from "./EditDeleteButton"



type Props = {
    content: null | string
    time: string
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
               <Text>{this.props.content}</Text>
               <Text>{this.props.time}</Text>
               {/* おそらくこの書き方がよくない*/}
               <View style={styles.element}>
                   <LikeButton
                   onPress={(isLiked) => !isLiked ? this.setState({isLiked: true}) :
                       this.setState({isLiked: false})}
                   isLiked={this.state.isLiked}/>
                   <EditDeleteButton/>
               </View>
           </Card>
        )
    }
}
