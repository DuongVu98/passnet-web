import { Action, Selector, State, StateContext } from "@ngxs/store";
import { NgxsDataRepository } from "@ngxs-labs/data/repositories";
import { StateRepository, Persistence } from "@ngxs-labs/data/decorators";

import { UserModel } from "../models/auth.models";
import { SetLoggedUserAction, UserLogoutAction } from "./auth.actions";

export class AuthStateModel {
	loggedUser: UserModel;
	isLogged: boolean;
	token: string;
}

const initState: AuthStateModel = {
	loggedUser: null,
	isLogged: false,
	token: null,
};

@Persistence()
@StateRepository()
@State<AuthStateModel>({
	name: "auth",
	defaults: initState,
})
export class AuthState extends NgxsDataRepository<AuthStateModel> {
	@Selector()
	static getLoggedUser(state: AuthStateModel): LoggedUserStateSelection {
		return new LoggedUserStateSelection(state.loggedUser, state.token);
	}

	@Action(SetLoggedUserAction)
	setUser(context: StateContext<AuthStateModel>, action: SetLoggedUserAction): void {
		const state = context.getState();
		context.setState({
			loggedUser: action.payload.user,
			isLogged: true,
			token: action.payload.token,
		});
	}

	@Action(UserLogoutAction)
	userLogout(context: StateContext<AuthStateModel>, action: UserLogoutAction): void {
		context.setState({
			loggedUser: null,
			isLogged: false,
			token: null,
		});
	}
}

export class LoggedUserStateSelection {
	constructor(public user: UserModel, public token: string) {}
}
