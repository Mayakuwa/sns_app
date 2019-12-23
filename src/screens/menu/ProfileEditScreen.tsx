import * as React from 'react';
import {View, Text, Image,TouchableHighlight, Button, StyleSheet, TextInput} from "react-native"
import { NavigationScreenProp} from "react-navigation"
import User from "../../common/model/user/User";
import Color from "../../common/Color";
import {ImageSelecter} from "../../common/image/ImageSelecter";
import CommonButton from "../../components/parts/common/CommonButton";
import {ImageInfo} from "expo-image-picker/build/ImagePicker.types";
import * as firebase from "firebase"
require('firebase/firestore');
import Firebase from "../../api/Firebase";
import CreateUserProfileApiFactory from "../../api/user/CreateUserProfileApi";



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
    image: ImageInfo | null
    authId: string
    name: string
}


export default class ProfileEditScreen extends React.Component <Props, State> {

    public constructor(props) {
        super(props);
        const user: User = this.props.navigation.state.params.user.authId
        this.state = {
            postContent: "",
            image: null,
            authId: user.authId,
            name: user.name

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
                    image: result as ImageInfo
                })
                this.uploadImage(this.state.image, this.state.authId)
            })
            .then(() => {
                this.loadImage();
            })
    }

    /**
     * 画像をアップロードする
     */

    private uploadImage = async (imageInfo, userId) => {
        const response = await fetch(imageInfo)
        const blob = response.blob()
        const ref = firebase.storage().ref().child('images/' + userId)
        return ref.put(blob);
    }

    private loadImage =　() => {
        const ref = firebase.storage().ref().child('images/' + this.state.authId);
        ref.getDownloadURL()
            .then(data => {
                this.setState({image: data})
            })
    }

    /**
     * 保存ボタンが押された
     */

    private handlePress = () => {
       const {name, image} = this.state;
        CreateUserProfileApiFactory.create().execute(name, image)
            .then(() => {
                this.props.navigation.state.params.refresh()
                return true
            })
            .catch((error) => {
                console.warn(error)
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
                {this.state.image ?
                    <Image source={{uri: this.state.image.uri}} style={style.imageStyle}/>
                    : null
                }
                <Button title="保存" onPress={this.handlePress}/>
            </View>
        )
    }
}
