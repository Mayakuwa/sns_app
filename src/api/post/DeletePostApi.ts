import Firebase from "../Firebase";

export default class DeletePostApiFactory {
    public create() {
        return new DeletePostApi();
    }
}

class DeletePostApi {
    public execute(postId) {
        Firebase.getInstance().load('post')
            .doc(postId)
            .delete()
            .then(snapShot =>{
                console.warn('delete' +  snapShot)
            })
            .catch(error => {
                console.warn(error);
            })
    }
}
