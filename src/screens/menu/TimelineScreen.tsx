import * as React from 'react';
import {View, Text,TouchableHighlight, Button, StyleSheet} from "react-native"
import PostTile from "../../components/parts/common/PostTile";
import * as firebase from "firebase";
import { NavigationScreenProp} from "react-navigation"

const style = StyleSheet.create({

})

type Props = {
    navigation: NavigationScreenProp<{}>;
}

export default class TimelineScreen extends React.Component <Props> {

    public handlePress = () => {
        console.log(this.props.navigation.getParam("title"));
        // const db = firebase.firestore();
        // const post = "SsSTj6AFQ6RcejgVHtpyMktiBzx2";
        // db.collection(`posts/${post}/users`).add({
        //     body: "test",
        //     createdOn: "2019-2-2",
        // })
        // .then((ref) => {
        //     console.log(ref)
        // })
        // .catch((error)  => {
        //     console.log(error)
        // })
    }

    public render() {

        let cards =  [];
        let card_number = ["a", "b", "c", "d"];
        for (let i=0; i < card_number.length; i++) {
                cards.push(
                    <TouchableHighlight>
                        <PostTile
                            key={i}
                            content={`これはポスト${card_number[i]}`}
                        />
                        {/*<Text>{this.props.navigation.state.params.user}</Text>*/}
                    </TouchableHighlight>
            )
        };

        return(
            <View>
                {cards}
                <Button
                    title="+"
                    onPress={() => this.handlePress()}/>
            </View>
        )
    }
}
