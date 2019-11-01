import * as React from 'react';
import {StyleSheet, View, Text, TextInput} from "react-native";
import Color from "../../common/Color";
import CommonTextInput from "../../components/parts/common/CommonTextInput";



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

export default class LoginScreen extends React.Component {
    public render() {
        return(
            <View style={styles.container}>
                <Text>ログインする</Text>
                <View>
                    <Text>メールアドレス</Text>
                    <CommonTextInput
                        style={styles.textInput}/>
                    <Text>パスワード</Text>
                    <CommonTextInput
                        style={styles.textInput}
                        password={true}
                    />
                </View>
            </View>
        )
    }
}
