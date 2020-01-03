import * as React from 'react';
import {View, Text,TouchableHighlight, StyleSheet} from "react-native"
import PostTile from "../../components/parts/common/PostTile";
import * as firebase from "firebase";
import { NavigationScreenProp} from "react-navigation"
require('firebase/firestore');
import Color from "../../common/Color";
import DeletePostApiFactory from "../../api/post/DeletePostApi"
import Storage from "../../api/Storage"

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
