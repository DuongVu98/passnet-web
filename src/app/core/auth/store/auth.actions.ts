import { UserModel } from "../models/auth.models";

export class SetLoggedUserAction {
	static readonly type = "[Auth] SetLoggedUser";
	constructor(public payload: {
        user: UserModel,
        token: string
    }) {}
}

export class UserLogoutAction {
	static readonly type = "[Auth] UserLogout";
}
