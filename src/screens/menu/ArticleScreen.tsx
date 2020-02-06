import * as React from 'react';
import {View, Text} from "react-native"
import {WebView} from "react-native-webview";
import {NavigationScreenProp} from "react-navigation";
import {ListItem, Left, Right, Thumbnail, Body, Button} from "native-base";
import Firebase from "../../api/Firebase"


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
               data.value.map(article => {
                 return this.addFirebase(article)
               })
                // this.setState({items: data.value});

            })
            .catch(err => {
                console.log(err);
            });

    }


    private addFirebase = (info) => {
        return Firebase.getInstance().saveData('articles', {
            name: info.name,
            content: info.description,
            url: info.url
        })
            .then(result => {
                console.warn(result)
            })
            .catch(error => {
                console.warn(error)
            })
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
