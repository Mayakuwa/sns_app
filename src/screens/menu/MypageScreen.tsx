import * as React from 'react';
import {View, Text, Image, StyleSheet} from "react-native";
import CommonButton from "../../components/parts/common/CommonButton";
import {ImageInfo} from "expo-image-picker/build/ImagePicker.types";
import {NavigationScreenProp} from "react-navigation";


type Props = {
    navigation: NavigationScreenProp<{}>
}



export default class MypageScreen extends React.Component <Props> {


    public componentDidMount() {
        this.props.navigation.setParams({
            goToProfileScreen: this.goToProfileScreen.bind(this)
        })
    }



    public goToProfileScreen = () => {
        this.props.navigation.navigate('ProfileEdit', {
            refresh: this.componentDidMount.bind(this)
        })
    }

    public render() {
        return(
            <View>
                <Text>写真をアップロード</Text>
                <CommonButton title="プロフィール編集"　onPress={() => this.props.navigation.state.params.goToProfileScreen()}/>
            </View>
        )
    }
}
