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
                console.warn(rss)
               this.setState({items: rss.items})
            })
    }


    private onWebView = (url) => {
        this.state.navigation.navigate('SettingDetailWebView', {
            url: url
        })
    }

    // private fetch = () => {
    //     fetch("https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/search?q=%25E6%25B5%25B7%25E5%25A4%2596%25E6%2597%2585%25E8%25A1%258C", {
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "microsoft-azure-bing-news-search-v1.p.rapidapi.com",
    //             "x-rapidapi-key": "48ad87710fmsh930fac3c8021acep19e621jsned186a5c9f5e"
    //         }
    //     })
    //         .then(response => {
    //             console.log(response);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }
    public render() {
       const articles = this.state.items.map(item =>(
           <ListItem onPress={() => this.onWebView(item.links[0].url)}>
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
