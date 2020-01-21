export type PostData = {
    content: string,
    userId: string,
    username: string,
    createdAt: string
    userImage: string
}

export default class Post {
    public constructor(
        public readonly id: string,
        public readonly content: string,
        public  userId: string,
        public readonly username: string,
        public readonly createdAt: string,
        public  userImage: string
    ) {}
}


