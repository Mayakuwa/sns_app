import Firebase from "../Firebase"
import Post,{PostData} from "../../common/model/post/Post"
import User,{UserData} from "../../common/model/user/User"
import UserFactory from "../../common/model/user/UserFactory"
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
                return posts
            })
            .then((posts) => {
                const users:User[] = []
                Firebase.getInstance().load('users')
                    .get()
                    .then(snapShots => {
                        snapShots.forEach((snapshot) => {
                            users.push(UserFactory.create(snapshot.id, snapshot.data() as UserData))
                        })
                        posts.forEach(post => {
                            users.forEach(user => {
                                post.userImage = user.image
                            })
                        })
                    })
                return posts;
            })
            .catch((error) => {
                return error
            })
    }

    private appendUserImageInfo = () => {
    //     ここにユーザーを追加する処理を追加
    }
}
