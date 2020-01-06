import Post, {PostData} from "./Post";

export default class PostFactrory {
    public static create(id: string, data: PostData) {
        return new Post(
            id,
            data.content,
            data.userId,
            data.username,
            new Date(data.createdAt * 1000)
        )
    }
}
