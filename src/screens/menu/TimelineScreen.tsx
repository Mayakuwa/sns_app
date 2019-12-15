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
    //ここも直す、配列で入れられるようにする
    postList: []
}


export default class TimelineScreen extends React.Component <Props, State> {

    public constructor(props) {
        super(props);
        this.state = {
           postList: [],
        }
    }


     public componentDidMount () {
        this.props.navigation.setParams({
            goToAskScreen: this.goToAskScreen.bind(this)
        })

        // firebase.firestore().collection('posts')
        //     .get().then(snapShot => {
        //        let posts = []
        //        snapShot.forEach((doc) => {
        //            posts.push(doc.data())
        //        });
        //        this.setState({postList: posts})
        //     })
        //     .catch((error) =>  {
        //         return error;
        //     })

        firebase.firestore().collection('posts')
            .orderBy('createdAt', "desc")
            .get()
            .then(snapShot => {
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

    public goToAskScreen = () => {
        this.props.navigation.navigate('Ask' ,{
            refresh: this.componentDidMount.bind(this)
        });
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
                    onPress={() =>this.props.navigation.state.params.goToAskScreen()}/>
            </View>
        )
    }
}
