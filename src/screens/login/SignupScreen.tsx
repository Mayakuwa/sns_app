import * as React from 'react';
import {StyleSheet, View, Text, Button, Alert} from "react-native";
import Color from "../../common/Color";
import CommonTextInput from "../../components/parts/common/CommonTextInput";
import {NavigationScreenProp} from "react-navigation";
import * as firebase from "firebase";

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
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                this.props.navigation.navigate('Top')
                console.log("succes");
                console.log(user);
            })
            .catch((error) => {
                if(!this.state.email && !this.state.password) {
                    alert("メールアドレスか、パスワードが違います。")
                }
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
