import { Action, Selector, State, StateContext } from "@ngxs/store";
import { NgxsDataRepository } from "@ngxs-labs/data/repositories";
import { StateRepository, Persistence } from "@ngxs-labs/data/decorators";

import { UserModel } from "../models/auth.models";
import { SetLoggedUserAction, UserLogoutAction } from "./auth.actions";

export class AuthStateModel {
	loggedUser: UserModel;
	isLogged: boolean;
}

const initState: AuthStateModel = {
	loggedUser: null,
	isLogged: false,
};

@Persistence()
@StateRepository()
@State<AuthStateModel>({
	name: "auth",
	defaults: initState,
})
export class AuthState extends NgxsDataRepository<AuthStateModel> {
	@Selector()
	static getLoggedUser(state: AuthStateModel): any {
		return state.loggedUser;
	}

	@Action(SetLoggedUserAction)
	setUser(context: StateContext<AuthStateModel>, action: SetLoggedUserAction): void {
		const state = context.getState();
		context.setState({
			loggedUser: action.payload,
			isLogged: true,
		});
	}

	@Action(UserLogoutAction)
	userLogout(context: StateContext<AuthStateModel>, action: UserLogoutAction): void {
		context.setState({
			loggedUser: null,
			isLogged: false,
		});
	}
}
