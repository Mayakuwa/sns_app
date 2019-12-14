import * as React from 'react';
import {View, Text, Image, StyleSheet} from "react-native";
import CommonButton from "../../components/parts/common/CommonButton";
import {ImageSelecter} from "../../common/image/ImageSelecter";
import {ImageInfo} from "expo-image-picker/build/ImagePicker.types";
import {NavigationScreenProp} from "react-navigation";

type State = {
    localImage: ImageInfo | null
}

type Props = {
    navigation: NavigationScreenProp<{}>
}

const style = StyleSheet.create({
    imageStyle: {
        width: 100,
        height: 100
    }
})

export default class MypageScreen extends React.Component <Props, State> {

    public constructor(props) {
        super(props);
        this.state = {
            localImage: null
        }
    }


    //画像追加ボタンが押された
    private uploadImage = () => {
        ImageSelecter.execute()
            .then(result => {
                if (result.cancelled) return;
                this.setState({
                    localImage: result as ImageInfo
                });
                this.props.navigation.state.params.localImage = this.state.localImage
            });
    }

    public render() {
        return(
            <View>
                <Text>写真をアップロード</Text>
               <CommonButton onPress={this.uploadImage}/>
                {this.state.localImage ?
                    <Image source={{uri: this.state.localImage.uri}} style={style.imageStyle}/>
                    : null
                }
            </View>
        )
    }
}
