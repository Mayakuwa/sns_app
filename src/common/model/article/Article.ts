export type ArticleDate  = {
    id: string,
    name: string,
    content: string,
    url: string,
    createdAt: string
}

export default class Article {
    public constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly content: string,
        public readonly url: string,
        public readonly createdAt: string,
    ) {}
}
