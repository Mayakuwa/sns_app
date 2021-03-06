import * as React from 'react';
import {StyleSheet, View, Text, Button} from "react-native";
import Color from "../../common/Color";
import CommonTextInput from "../../components/parts/common/CommonTextInput";
import {NavigationActions, NavigationScreenProp, StackActions} from "react-navigation";
import * as firebase from "firebase";
import Firebase from "../../api/Firebase";
import Storage from "../../api/Storage";
require("firebase/firestore");


type Props = {
    navigation: NavigationScreenProp<{}>
}

type State = {
    email: string,
    password: string
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderColor: Color.black,
        height: 50,
        width: 300,
        fontSize: 20
    }

})


export default class SignupScreen extends React.Component <Props, State> {

    public constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }


    public onHandlePress = () => {
        Firebase.createAnonimousUser()
            .then((user) => {
                const promise = firebase.firestore().collection('users').doc(user.user.uid)
                    .set({
                        name: this.state.email,
                        password: this.state.password
                    })
                    .then(() => {
                        return user.user.uid
                    })
                    .catch((error) => {
                        return error;
                    });
                return Promise.resolve(promise)
            })
            .then((userId: string) => {
                const storage = new Storage();
                storage.save(Storage.KEY_USER_ID, userId)
                return true;
            })
            .then(() => {
                //　topに遷移後に、履歴を削除し、gobackボタンなくす
                const resetAction =　StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'Top'})],
                })
                this.props.navigation.dispatch(resetAction);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public render() {
        return(
            <View style={styles.container}>
                <Text>登録する</Text>
                <View>
                    <Text>メールアドレス</Text>
                    <CommonTextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({email: text})}
                    />
                    <Text>パスワード</Text>
                    <CommonTextInput
                        style={styles.textInput}
                        password={true}
                        onChangeText={(text) => this.setState({password: text})}
                    />
                    <Button
                        title='登録する'
                        onPress={() => this.onHandlePress()}
                    />
                </View>
            </View>
        )
    }
}
