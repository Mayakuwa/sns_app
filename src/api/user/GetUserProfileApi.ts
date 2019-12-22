import User, {UserData} from "../../common/model/user/User";
import UserFactory from "../../common/model/user/UserFactory";
import Firebase from "../Firebase"

export default class GetUserProfileApiFactory {
    public static create() {
        return new GetUserProfile();
    }
}

export class GetUserProfile {
    public execute(id: string) {
        return Firebase.getInstance().load('users')
            .doc(id)
            .get()
            .then(snapShot => {
                // ユーザーデータとして加工
                const userData: UserData = snapShot.data() as User;
                return UserFactory.create(id, userData)
            })
    }
}

