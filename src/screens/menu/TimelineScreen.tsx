import * as React from 'react';
import {View, Text,TouchableHighlight} from "react-native"
import PostTile from "../../components/parts/common/PostTile";

export default class TimelineScreen extends React.Component {
    public render() {

        let cards =  [];
        let card_number = ["a", "b", "c", "d"];
        for (let i=0; i < card_number.length; i++) {
                cards.push(
                    <TouchableHighlight>
                        <PostTile
                            key={i}
                            content={`これはポスト${card_number[i]}`}
                        />
                    </TouchableHighlight>
            )
        };

        return(
            <View>
                {cards}
            </View>
        )
    }
}
