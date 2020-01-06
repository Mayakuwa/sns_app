import Firebase from "../../api/Firebase"
import Post from "../../common/model/post/Post";
import Storage from "../../api/Storage"


export default class CreatePostApiFactory {
    public static create() {
        return new CreatePostApi()
    }
}

class CreatePostApi {
    public execute(content: string, username: string, userId: string) {
        return Firebase.getInstance().saveData('posts', {
            content: content,
            userId: userId,
            username: username,
            createdAt: new Date().toLocaleString("ja"),
        })
        .then((result) => {
            console.warn(result);
         })
        .catch((error) => {
            return error
        })
    }
}




