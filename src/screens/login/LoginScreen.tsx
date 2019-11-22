import * as React from 'react';
import {StyleSheet, View, Text, Button, Alert} from "react-native";
import Color from "../../common/Color";
import CommonTextInput from "../../components/parts/common/CommonTextInput";
import {NavigationActions, NavigationScreenProp, StackActions} from "react-navigation";
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


export default class LoginScreen extends React.Component <Props, State> {

    public constructor(props) {
        super(props);
        //めんどくさいので、stateでデータ直張り
        this.state = {
            email: "maya@gmail.com",
            password: "mayamaya"
        }
    }


    public onHandlePress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                console.log("succes!");
                console.log(user);
                const resetAction =　StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'Top'})],
                })
                this.props.navigation.dispatch(resetAction);


                // this.props.navigation.navigate('Top', {
                //    user: user
                // })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    public render() {
        return(
            <View style={styles.container}>
                <Text>ログインする</Text>
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
                        title='ログインする'
                        onPress={() => this.onHandlePress()}
                    />
                </View>
            </View>
        )
    }
}
