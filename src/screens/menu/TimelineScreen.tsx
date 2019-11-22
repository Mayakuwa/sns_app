import * as React from 'react';
import {View, Text,TouchableHighlight, Button, StyleSheet} from "react-native"
import PostTile from "../../components/parts/common/PostTile";
import * as firebase from "firebase";
import { NavigationScreenProp} from "react-navigation"
require('firebase/firestore');

const style = StyleSheet.create({

})

type Props = {
    navigation: NavigationScreenProp<{}>;
}

type State = {
    postList: any
}


export default class TimelineScreen extends React.Component <Props, State> {

    public constructor(props) {
        super(props);
        this.state = {
           postList: []
        }
    }


    componentWillMount () {
        firebase.firestore().collection('posts')
            .get().then(snapShot => {
               let posts = []
               snapShot.forEach((doc) => {
                   posts.push(doc.data())
               });
               this.setState({postList: posts})
                console.log(this.state.postList)
            })
            .catch((error) =>  {
                return error;
            })
    }

    public handlePress = () => {
        this.props.navigation.navigate('Ask');
    }



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

        const hoge = this.state.postList.map((post) => {
            return <Text>{post.content}</Text>
        })


        return(
            <View>
                {hoge}
                {cards}
                <Button
                    title="+"
                    onPress={() => this.handlePress()}/>
            </View>
        )
    }
}
