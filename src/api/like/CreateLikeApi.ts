import Firebase from "../Firebase";


export default class CreateLikeApiFactroy {
    public static create() {
        return new CreateLikeApi()
    }
}


class CreateLikeApi {
    public execute(userId: string, targetId: string,  target: string, isLiked: boolean) {
        return Firebase.getInstance().saveData('like', {
            userId,
            targetId,
            target
        })
        .then(id => {
            console.warn(id)
        })
        .catch((error) =>{
            console.warn(error)
        })
    }
}
