import * as React from 'react';
import {View, Text} from "react-native"
import {WebView} from "react-native-webview";
import {NavigationScreenProp} from "react-navigation";
import {ListItem, Left, Right, Thumbnail, Body, Button} from "native-base";
import Firebase from "../../api/Firebase";
import Article, {ArticleDate} from "../../common/model/article/Article"
import ArticleFactory from "../../common/model/article/ArticleFactory"


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

               const oldArticles = Firebase.getInstance().load('articles')
                   .orderBy('createdAt', 'desc')
                   .get()
                   .then(snapshot => {
                      return this.createOldArticle(snapshot)
                   })

               oldArticles.then(oldArticle => {
                   oldArticle.map(value => {
                        data.value.map(newArticle => {
                            if (!value.name == newArticle.name)  {
                                return this.addFirebase(newArticle)
                            }
                        })
                    })
               })
                this.setState({items: data.value});
            })
            .catch(err => {
                 throw err
            });

    }


    private addFirebase = (info) => {
        return Firebase.getInstance().saveData('articles', {
            name: info.name,
            content: info.description,
            url: info.url,
            createdAt: new Date().toLocaleString("ja")
        })
            .then(result => {
              return true
            })
            .catch(error => {
                console.warn(error)
            })
    }

    // 古い記事を加工
    private createOldArticle (snapshot): Article[] {
        const article:Article[] = []
        snapshot.forEach(row => {
            article.push(ArticleFactory.create(row.id, row.data() as ArticleDate))
        })
        return article;
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
