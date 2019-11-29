import * as React from 'react';
import {View, Text,TouchableHighlight, Button, StyleSheet, TextInput} from "react-native"
import PostTile from "../components/parts/common/PostTile";
import * as firebase from "firebase";
import { NavigationScreenProp} from "react-navigation"
import Color from "../common/Color";
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
}

export default class AskScreen extends React.Component <Props, State> {

    public constructor(props) {
        super(props);
        this.state = {
            postContent: ""
        }
    }


    public handleSubmit = () => {
        const db = firebase.firestore()
        db.collection('posts').add({
            content: this.state.postContent,
            createdAt: new Date().toLocaleString("ja")
    })
            .then(() => {
                console.log('succes!')
                console.log( this.props.navigation.state.params.refresh());
                this.props.navigation.state.params.refresh();
                this.props.navigation.goBack()
            })
            .catch((error) => {
                console.log('error')
            })
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
