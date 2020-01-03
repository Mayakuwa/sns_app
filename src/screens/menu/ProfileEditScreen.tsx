import * as React from 'react';
import {View, Text, Image,TouchableHighlight, Button, StyleSheet, TextInput,  Alert} from "react-native"
import { NavigationScreenProp} from "react-navigation"
import User from "../../common/model/user/User";
import CommonButton from "../../components/parts/common/CommonButton";
import {ImageInfo} from "expo-image-picker/build/ImagePicker.types";
import * as firebase from "firebase"
require('firebase/firestore');
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from "expo-camera";
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
    isAccepted: boolean,
    isVisible: boolean
}


export default class ProfileEditScreen extends React.Component <Props, State> {

    public constructor(props) {
        super(props);
        // 変数定義時にインタフェース(User)を指定
        const user: User = this.props.navigation.state.params.user
        this.state = {
            postContent: "",
            image: null,
            authId: user.authId,
            name: user.name,
            isAccepted: true,
            isVisible: false

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
    private addPhotoPress = async () => {
        const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (permission.status !== 'granted') {
            const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (newPermission.status !== 'granted') {
                this.setState({isAccepted: false});
            }
        }
        if (this.state.isAccepted) {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [9, 9]
            });
            if (!result.cancelled) {
                this.setState({isVisible: true});
                this.uploadImage(result.uri, this.state.authId)
                    .then(() => {
                        this.loadImage();
                    })
                    .catch((error) => {
                        Alert.alert(error);
                        console.log(error);
                    });
            }
        }
    }

    //　動作確認する
    private addPhotoPressByCamera = async () => {
        const permission = await Permissions.getAsync(Permissions.CAMERA)
        if (permission.status !== 'granted') {
            const newPermission = await Permissions.askAsync(Permissions.CAMERA);
            if (newPermission.status !== 'granted') {
                this.setState({isAccepted: false});
            }
        }

        if (this.state.isAccepted) {
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [9, 9]
            })
            if (!result.cancelled) {
                this.setState({isVisible: true});
                this.uploadImage(result.uri, this.state.authId)
                    .then(() => {
                        this.loadImage();
                    })
                    .catch((error) => {
                        Alert.alert(error);
                        console.log(error);
                    });
            }
        }
    }

    /**
     * 画像をアップロードする
     */

    private uploadImage = async (uri, userId) => {
        const response = await fetch(uri)
        const blob = await response.blob();
        const ref = firebase.storage().ref().child('images/' + userId)
        return ref.put(blob);
    }

    private loadImage =　() => {
        const ref = firebase.storage().ref().child('images/' + this.state.authId);
        ref.getDownloadURL()
            .then(data => {
                this.setState({image: data})
                this.setState({isVisible: false});
            })
    }

    /**
     * 保存ボタンが押された
     */

    private handlePress = () => {
       const {name, image} = this.state;
        CreateUserProfileApiFactory.create().execute(name, image)
            .then(() => {
                this.props.navigation.goBack();
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
                    title="カメラロールから"
                    onPress={() => this.addPhotoPress()}
                />

                <CommonButton
                    title="写真をとる"
                    onPress={() => this.addPhotoPressByCamera()}
                />
                {this.state.image ?
                    <Image source={{uri: this.state.image}} style={style.imageStyle}/>
                    : null
                }
                <Button title="保存" onPress={this.handlePress}/>
            </View>
        )
    }
}
