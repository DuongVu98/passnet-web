import { UserModel } from "../models/auth.models";

export class SetLoggedUser {
	static readonly type = "[Auth] SetLoggedUser";
	constructor(public payload: UserModel) {}
}

export class UserLogout {
    static readonly type = "[Auth] UserLogout";
}
