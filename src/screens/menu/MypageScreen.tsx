import * as React from 'react';
import {View, Text, Image, StyleSheet} from "react-native";
import CommonButton from "../../components/parts/common/CommonButton";
import {ImageInfo} from "expo-image-picker/build/ImagePicker.types";
import {NavigationScreenProp} from "react-navigation";
import Storage from "../../api/Storage";
import User from "../../common/model/user/User";
import GetUserProfileApiFactory from "../../api/user/GetUserProfileApi";


type Props = {
    navigation: NavigationScreenProp<{}>
}

interface State  {
    // 本当はnullを許容したい
    user: User,
}

export default class MypageScreen extends React.Component <Props, State> {

   public constructor(props, state) {
       super(props, state);
       this.state = {
           // 本当はnullにしたい
           user: User
       }

   }


    public componentDidMount() {
        this.fetchUser();
        this.props.navigation.setParams({
            goToProfileScreen: this.goToProfileScreen.bind(this)
        })
    }

    // ここ編集！！！
    private fetchUser = () => {
        const storage = new Storage();
        storage.load(Storage.KEY_USER_ID)
            .then(id => {
               GetUserProfileApiFactory.create().execute(id)
                    .then(user => {
                        this.setState({user: user})
                        console.warn(this.state.user)
                    })
            })
    }

    private goToProfileScreen = () => {
        this.props.navigation.navigate('ProfileEdit', {
            refresh: this.componentDidMount.bind(this)
        })
    }

    public render() {
        return(
            <View>
                <Text>写真をアップロード</Text>
                <Text>{this.state.user.name}</Text>
                <Text>{this.state.user.password}</Text>
                <CommonButton title="プロフィール編集"　onPress={() => this.props.navigation.state.params.goToProfileScreen()}/>
            </View>
        )
    }
}
