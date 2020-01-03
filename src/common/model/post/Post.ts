export type PostData = {
    content: string,
    userId: string,
    username: string,
    createdAt: number,
}

export default class Post {
    public constructor(
        public readonly content: string,
        public readonly userId: string,
        public readonly username: string,
        public readonly createdAt: number
    ) {}
}


