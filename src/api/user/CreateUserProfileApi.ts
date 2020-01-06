import Firebase from "../../api/Firebase"
import Storage from "../../api/Storage";

export default class CreateUserProfileApiFactory {
    public static create() {
        return new CreateUserProfileApi();
    }
}

export class CreateUserProfileApi {

   public execute(name: string, image) {
       const storage = new Storage();
       return storage.load(Storage.KEY_USER_ID)
           .then(userId => {
               Firebase.getInstance().load('users')
                   .doc(userId)
                   .update({
                       name: name,
                       image: image,
                       updatedAt: Math.floor((new Date().getTime() / 1000))
                   })
                   .then(() => {
                       return true;
                       })
                   .catch((error) => {
                       return error;
                   })
           })
   }

}

