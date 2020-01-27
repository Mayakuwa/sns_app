import * as React from 'react';
import {View, Text} from "react-native"
import {WebView} from "react-native-webview";
import {NavigationScreenProp} from "react-navigation";
import * as rssParser from 'react-native-rss-parser';


type State = {
    article: []
}

export default class ArticleScreen extends React.Component <State>{

    public constructor(props, state) {
        super(props, state);
        this.state = {
            articles: []
        }
    }


    private fetch = () => {
        fetch("https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/search?q=%25E6%25B5%25B7%25E5%25A4%2596%25E6%2597%2585%25E8%25A1%258C", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "microsoft-azure-bing-news-search-v1.p.rapidapi.com",
                "x-rapidapi-key": "48ad87710fmsh930fac3c8021acep19e621jsned186a5c9f5e"
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }
    public render() {
        return(
            <View>
                <Text>記事一覧</Text>
                <WebView/>
            </View>
        )
    }
}
