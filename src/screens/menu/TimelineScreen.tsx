import * as React from 'react';
import {View, Text,TouchableHighlight, StyleSheet} from "react-native"
import PostTile from "../../components/parts/common/PostTile";
import * as firebase from "firebase";
import { NavigationScreenProp} from "react-navigation"
require('firebase/firestore');
import Color from "../../common/Color";
import Post from "../../common/model/post/Post"
import Storage from "../../api/Storage"
import GetUserProfileApiFactory from "../../api/user/GetUserProfileApi";
import User from "../../common/model/user/User"
import DeletePostApiFactory from "../../api/post/DeletePostApi";

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonPosition: {
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        width: 20,
        height: 20,
        backgroundColor: Color.navy,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Color.white
    }
})

type Props = {
    navigation: NavigationScreenProp<{}>;
}

interface State {
    //ここも直す、配列で入れられるようにする
    postList: Post[]
    user: User
}


export default class TimelineScreen extends React.Component <Props, State> {

    public constructor(props) {
        super(props);
        this.state = {
           postList: [],
           user: null
        }
    }


     public componentDidMount () {
             const storage = new Storage()
             storage.load(Storage.KEY_USER_ID)
                 .then((id) => {
                     GetUserProfileApiFactory.create().execute(id)
                         .then((user) => {
                             this.setState({user: user})
                         })
                 })

        this.props.navigation.setParams({
            goToAskScreen: this.goToAskScreen.bind(this)
        })

        firebase.firestore().collection('posts')
            .orderBy('createdAt', "desc")
            .get()
            .then(snapShot => {
            let posts = []
            snapShot.forEach((doc) => {
                console.warn(doc.data())
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
            refresh: this.componentDidMount.bind(this),
            user: this.state.user
        });
    }


    public render() {
        const hoge = this.state.postList.map((post) => {
                return <TouchableHighlight>
                        <PostTile
                            name={post.username}
                            content={post.content}
                            time={post.createdAt}
                            onPress={(post) => this.props.navigation.navigate('Post', {
                                post: post.id
                            })}
                        />
                       </TouchableHighlight>
        })

        return(
            <View style={style.container}>
                {hoge}
                <View style={style.buttonPosition}>
                    <TouchableHighlight
                        style={style.button}
                        onPress={() =>this.props.navigation.state.params.goToAskScreen()}>
                        <Text style={style.text}>+</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}
