import Like, {LikeData} from "./Like"

export default class PostFactory {
    public static create(id: string, data: LikeData) {
        return new Like(
            data.id,
            data.userId,
            data.targetId,
            data.target,
            data.isLiked
        )
    }
}
