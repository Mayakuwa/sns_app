import * as React from 'react';
import {View, Text,TouchableHighlight, Button, StyleSheet, TextInput} from "react-native"
import PostTile from "../components/parts/common/PostTile";
import * as firebase from "firebase";
import { NavigationScreenProp} from "react-navigation"
import Color from "../common/Color";

const style = StyleSheet.create({
    container: {
        flex: 1,
    }
})

type Props = {
    navigation: NavigationScreenProp<{}>;
}

export default class AskScreen extends React.Component <Props> {

    public handlePress = () => {
        // console.log(this.props.navigation.getParam("title"));
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

        return(
            <View style={style.container}>
                <Text>投稿してみましょう</Text>
             <TextInput
                 multiline={true}
                 style={{borderColor: Color.black,
                         borderWidth: 1,
                         flex: 1,
                         flexDirection: 'row',
                         alignItems: "center",
                         marginTop: 16,
                         marginLeft: 20,
                         marginRight: 20,
                     }}>

             </TextInput>
            </View>
        )
    }
}
