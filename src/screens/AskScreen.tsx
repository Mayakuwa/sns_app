import * as React from 'react';
import {View, Text,TouchableHighlight, Button, StyleSheet, TextInput} from "react-native"
import PostTile from "../components/parts/common/PostTile";
import * as firebase from "firebase";
import { NavigationScreenProp} from "react-navigation"
import Color from "../common/Color";
import Storage from "../api/Storage";
import GetUserProfileApiFactory from "../api/user/GetUserProfileApi";
require('firebase/firestore')


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
    userId: string
}


export default class AskScreen extends React.Component <Props, State> {

    public constructor(props) {
        super(props);
        this.state = {
            postContent: "",
            userId: null
        }
    }

    public componentDidMount() {
        const storage = new Storage()
        storage.load(Storage.KEY_USER_ID)
            .then((id) => {
                this.setState({userId: id})
            })
    }


    private handleSubmit = () => {
        if (this.state.postContent === "" )  {
            alert('コンテンツがありません');
        } else {
            // これをAPI化する
            const db = firebase.firestore()
            db.collection('posts').add({
                content: this.state.postContent,
                createdAt: new Date().toLocaleString("ja"),
                userId: this.state.userId
            })
                .then(() => {
                    console.log('succes!')
                    console.log(this.props.navigation.state.params.refresh());
                    // 好きな場所でこれを呼び出すと親画面の更新が行われる。
                    this.props.navigation.state.params.refresh();
                    this.props.navigation.goBack()
                })
                .catch((error) => {
                    console.warn('error')
                })
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
