import Article, {ArticleDate} from "./Article";

export default class ArticleFactory {
    public static create(id: string, date: ArticleDate) {
       return new Article(
           id,
           date.name,
           date.content,
           date.url,
           date.createdAt
       )
    }
}
