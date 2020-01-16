import Firebase from "../Firebase"
import Post,{PostData} from "../../common/model/post/Post"
import PostFactroy from "../../common/model/post/PostFactrory"


export default class GetAllPostApiFactory {
    public static create()  {
        return new GetAllPostApi()
    }
}

export class GetAllPostApi {
    public execute() {
        return Firebase.getInstance().load('posts')
            .get()
            .then(snapShots => {
                const posts:Post[] = []
                snapShots.forEach(snapshot => {
                   posts.push(PostFactroy.create(snapshot.id, snapshot.data() as PostData))
                })
                return posts;
            })
            .catch((error) => {
                return error
            })
    }
}
