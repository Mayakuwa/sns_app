import User, {UserData} from "./User";

export default class UserFactory {
    public static create(id: string,  data: UserData) {
        return new User(
            data.authId || id,
            data.name,
            data.password
        )
    }
}



