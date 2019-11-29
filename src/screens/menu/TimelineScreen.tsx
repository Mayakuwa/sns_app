import * as React from 'react';
import {View, Text,TouchableHighlight, Button, StyleSheet} from "react-native"
import PostTile from "../../components/parts/common/PostTile";
import * as firebase from "firebase";
import { NavigationScreenProp} from "react-navigation"
import index from "react-native-paper/lib/typescript/example/src";
require('firebase/firestore');

const style = StyleSheet.create({

})

type Props = {
    navigation: NavigationScreenProp<{}>;
}

type State = {
    //ここも直す、配列で入れられるようにする
    postList: any
    isRefresh: boolean


}


export default class TimelineScreen extends React.Component <Props, State> {

    public constructor(props) {
        super(props);
        this.state = {
           postList: [],
            isRefresh: false
        }
    }


    componentDidMount () {
        if (this.state.isRefresh) return;
        console.log('DidMount')
        firebase.firestore().collection('posts')
            .get().then(snapShot => {
               let posts = []
               snapShot.forEach((doc) => {
                   posts.push(doc.data())
               });
               this.setState({postList: posts})
            })
            .catch((error) =>  {
                return error;
            })
    }

    public AddPress = () => {
        this.props.navigation.navigate('Ask' ,{
            refresh: this.onRefresh.bind(this)
        });
    }

    private onRefresh = () => {
        this.setState({isRefresh: true})
    }


    public render() {
        const hoge = this.state.postList.map((post) => {
                return <TouchableHighlight>
                        <PostTile
                            content={post.content}
                            time={post.createdAt}
                        />
                       </TouchableHighlight>
        })

        return(
            <View>
                {hoge}
                <Button
                    title="+"
                    onPress={() => this.AddPress()}/>
            </View>
        )
    }
}
