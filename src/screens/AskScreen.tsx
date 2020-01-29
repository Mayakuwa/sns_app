import * as React from 'react';
import {View, Text,TouchableHighlight, Button, StyleSheet, TextInput} from "react-native"
import PostTile from "../components/parts/common/PostTile";
import * as firebase from "firebase";
import { NavigationScreenProp} from "react-navigation"
import Color from "../common/Color";
import User from "../common/model/user/User"
require('firebase/firestore')
import CreatePostApiFactory from "../api/post/CreatePostApi";



const style = StyleSheet.create({
    container: {
        flex: 1,
    }
})

type Props = {
    navigation: NavigationScreenProp<{}>;
}

type State = {
    postContent: string
    userId: string,
    username: string
}


export default class AskScreen extends React.Component <Props, State> {

    public constructor(props, state) {
        super(props, state);
        const user:User = this.props.navigation.state.params.user;
        this.state = {
            postContent: "",
            userId: user.authId,
            username: user.name
        }
    }


    private handleSubmit = () => {

        const {postContent, userId, username} = this.state

        if (postContent === "" )  {
            alert('コンテンツがありません');
        } else {
            // これをAPI化する
            CreatePostApiFactory.create().execute(postContent, username, userId)
                .then(() => {
                            // 好きな場所でこれを呼び出すと親画面の更新が行われる。
                    this.props.navigation.state.params.refresh();
                    this.props.navigation.goBack()
                })
                .catch((error) => {
                    return error
                })

            // const db = firebase.firestore()
            // db.collection('posts').add({
            //     content: this.state.postContent,
            //     createdAt: new Date().toLocaleString("ja"),
            //     username: this.state.username,
            //     userId: this.state.userId
            // })
            //     .then(() => {
            //         console.log('succes!')
            //         console.log(this.props.navigation.state.params.refresh());
            //         // 好きな場所でこれを呼び出すと親画面の更新が行われる。
            //         this.props.navigation.state.params.refresh();
            //         this.props.navigation.goBack()
            //     })
            //     .catch((error) => {
            //         console.warn('error')
            //     })
        }
    }


    public render() {

        return(
            <View style={style.container}>
                <Text>投稿してみましょう</Text>
                 <TextInput
                     onChangeText={(text) => this.setState({postContent: text})}
                     value={this.state.postContent}
                     multiline={true}
                     style={{borderColor: Color.black,
                             borderWidth: 1,
                             flex: 1,
                             flexDirection: 'row',
                             alignItems: "center",
                             marginTop: 16,
                             marginLeft: 20,
                             marginRight: 20,
                         }}/>
                <Button
                    title="投稿する"
                    style={{marginRight: 20}}
                    onPress={() => this.handleSubmit()}
                />
            </View>
        )
    }
}
