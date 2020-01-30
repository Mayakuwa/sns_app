import * as React from 'react';
import {View, Text} from "react-native"
import {WebView} from "react-native-webview";
import {NavigationScreenProp} from "react-navigation";
import * as rssParser from 'react-native-rss-parser';
import {ListItem, List, Content, Left, Right, Thumbnail, Body, Button} from "native-base";


type State = {
    items: []
}

type Props = {
    navigation: NavigationScreenProp<{}>;
}


export default class ArticleScreen extends React.Component <State, Props> {

    constructor (props, state) {
        super(props, state);
        this.state = {
            items: []
        };
    }

    public componentDidMount() {
        return this.fetch()
    }

    private fetch = () => {
        return fetch("https://jp.techcrunch.com/feed/")
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss)=> {
                // rss.items[0].links[0].urlでurlが取れる
               this.setState({items: rss.items})
            })
    }


    private onWebView = (url) => {
        this.props.navigation.navigate('SettingDetailWebView', {
            url: url
        })
    }


    public render() {
       const articles = this.state.items.map(item =>(
           <ListItem onPress={() => this.onWebView(item.links[0].url)}>
               {console.warn(item.links[0].url)}
               <Left>
                   <Thumbnail square source={{ uri: 'https://www.joint-kaigo.com/1/_src/58756/img20191207081956811162.jpg?v=1575675517779' }} />
               </Left>
               <Body>
                   <Text numberOfLines={2}>{item.title}</Text>
               </Body>
               <Right>
                   <Button transparent>
                       <Text>View</Text>
                   </Button>
               </Right>
           </ListItem>
       ))

        return(
            <View>
                {articles}
            </View>
        )
    }
}
