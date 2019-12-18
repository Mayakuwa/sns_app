import * as React from 'react';
import {View, Text, Image,TouchableHighlight, Button, StyleSheet, TextInput} from "react-native"
import { NavigationScreenProp} from "react-navigation"
import Color from "../../common/Color";
import {ImageSelecter} from "../../common/image/ImageSelecter";
import CommonButton from "../../components/parts/common/CommonButton";
import {ImageInfo} from "expo-image-picker/build/ImagePicker.types";
import * as firebase from "firebase"
require('firebase/firestore');
import Firebase from "../../api/Firebase";



const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageStyle: {
        width: 100,
        height: 100
    }
})

type Props = {
    navigation: NavigationScreenProp<{}>;
}

type State = {
    postContent: string,
    localImage: ImageInfo | null
}


export default class ProfileEditScreen extends React.Component <Props, State> {

    public constructor(props) {
        super(props);
        this.state = {
            postContent: "",
            localImage: null
        }
    }


    // public handleSubmit = () => {
    //     const db = firebase.firestore()
    //     db.collection('posts').add({
    //         content: this.state.postContent,
    //         createdAt: new Date().toLocaleString("ja")
    //     })
    //         .then(() => {
    //             console.log('succes!')
    //             console.log(this.props.navigation.state.params.refresh());
    //             // 好きな場所でこれを呼び出すと親画面の更新が行われる。
    //             this.props.navigation.state.params.refresh();
    //             this.props.navigation.goBack()
    //         })
    //         .catch((error) => {
    //             console.log('error')
    //         })
    // }

    /**
     * 写真追加ボタンが押された
     */
    private addPhotoPress = () => {
        ImageSelecter.execute()
            .then(result => {
                if (result.cancelled) return;
                this.setState({
                    localImage: result as ImageInfo
                })
            })
    }

    /**
     * 保存ボタンが押された
     */

    private handlePress = () => {
        const storage = firebase.storage().ref();
        const ref = storage.child(this.state.localImage.uri);
        const blob = new Blob([this.state.localImage.uri]);

        console.warn(blob)

        ref.put(blob)
            .then(response=>
                console.warn(response)
            )
            .catch(error => {
                console.warn(error);
            })

    }

    // private handlePress = () => {
    //     const storage = firebase.storage().ref();
    //     const ref = storage.child(this.state.localImage.uri);
    //     const blob = new Blob([this.state.localImage.uri]);
    //
    //     console.warn(blob)
    //
    //     ref.put(blob)
    //         .then(response=>
    //             console.warn(response)
    //         )
    //         .catch(error => {
    //             console.warn(error);
    //         })
    //
    // }

    public render() {

        return(
            <View style={style.container}>
                <Text>画像をアップしましょう！！</Text>
                <CommonButton
                    title="写真追加"
                    onPress={() => this.addPhotoPress()}
                />
                {this.state.localImage ?
                    <Image source={{uri: this.state.localImage.uri}} style={style.imageStyle}/>
                    : null
                }
                <Button title="保存" onPress={this.handlePress}/>
            </View>
        )
    }
}
