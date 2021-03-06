export type UserData = {
    authId?: string,
    name: string,
    password: string
    image: string
}

export default class User {
   public constructor(
       public readonly authId: string,
       public readonly name: string,
       public readonly password: string,
       public image: string
   ) {};
}
