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

    // private fetch = () => {
    //     return fetch("https://jp.techcrunch.com/feed/")
    //         .then((response) => response.text())
    //         .then((responseData) => rssParser.parse(responseData))
    //         .then((rss)=> {
    //             // rss.items[0].links[0].urlでurlが取れる
    //            this.setState({items: rss.items})
    //         })
    // }

    private fetch = () => {
        fetch("https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/search?count=5&q=travel", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "microsoft-azure-bing-news-search-v1.p.rapidapi.com",
                    "x-rapidapi-key": "48ad87710fmsh930fac3c8021acep19e621jsned186a5c9f5e"
                }
            }
        )
            .then(response => {
                return response.json()
            })
            .then((data) => {
                this.setState({items: data.value});
                console.warn(this.state.items)

            })
            .catch(err => {
                console.log(err);
            });
        // return fetch("https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/search?count=5&q=%25E4%25BB%258B%25E8%25AD%25B7", {
        //     "method": "GET",
        //     "headers": {
        //         "x-rapidapi-host": "microsoft-azure-bing-news-search-v1.p.rapidapi.com",
        //         "x-rapidapi-key": "48ad87710fmsh930fac3c8021acep19e621jsned186a5c9f5e"
        //     }
        // })
        //     .then(response => {
        //         console.warn(response);
        //         return response.json()
        //     })
        //     .then((data) => {
        //         console.warn(data.value);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }





    private onWebView = (url) => {
        this.props.navigation.navigate('SettingDetailWebView', {
            url: url
        })
    }


    public render() {
       const articles = this.state.items.map(item =>(
           <ListItem onPress={() => this.onWebView(item.url)}>
               <Left>
                   <Thumbnail square source={{ uri: item.image.thumbnail.contentUrl}} />
               </Left>
               <Body>
                   <Text numberOfLines={2} style={{fontSize: 15, fontWeight: 'bold'}}>{item.name}</Text>
                   <Text numberOfLines={2}>{item.description}</Text>
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
