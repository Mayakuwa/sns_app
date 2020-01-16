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
                const users:User[] = []
                Firebase.getInstance().load('users')
                    .get()
                    .then(snapShots => {
                        snapShots.forEach((snapshot) => {
                            users.push(UserFactory.create(snapshot.id, snapshot.data() as UserData))
                        })
                        posts.map(post => {
                            users.map(user => {
                                post.userImage = user.image
                            })
                        })
                        console.warn(posts)
                    })
                return posts;
            })
            .catch((error) => {
                return error
            })
    }
}
