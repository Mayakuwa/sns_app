import * as React from "react";
import {StyleSheet,Text,View, TextInput} from "react-native";
import Color from "../../../common/Color"

type Props =  {
    style: any
    password ? : boolean
    onChangeText ? :(text: string) => void
}

const styles = StyleSheet.create({
    textAlign: {
        padding: 5
    }
})

export default class CommonTextInput extends React.Component <Props> {
    public render() {
        return(
           <View style={styles.textAlign}>
               <TextInput
                   onChangeText={this.props.onChangeText}
                   secureTextEntry={this.props.password}
                   style={this.props.style}/>
           </View>
        )
    }
}
