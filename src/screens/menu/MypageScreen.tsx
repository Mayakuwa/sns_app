import * as React from 'react';
import {View, Text} from "react-native";
import CommonButton from "../../components/parts/common/CommonButton";



export default class MypageScreen extends React.Component {
    public render() {
        return(
            <View>
                <Text>マイページ</Text>
               <CommonButton/>
            </View>
        )
    }
}
