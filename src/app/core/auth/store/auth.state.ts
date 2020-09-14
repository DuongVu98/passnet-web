import { Action, Selector, State, StateContext } from "@ngxs/store";
import { NgxsDataRepository } from "@ngxs-labs/data/repositories";
import { StateRepository, Persistence } from "@ngxs-labs/data/decorators";

import { UserModel } from "../models/auth.models";
import { SetLoggedUser } from "./auth.actions";

export class AuthStateModel {
	loggedUser: UserModel;
	isLogged: boolean;
}

@Persistence()
@StateRepository()
@State<AuthStateModel>({
	name: "auth",
	defaults: {
		loggedUser: null,
		isLogged: false,
	},
})
export class AuthState extends NgxsDataRepository<AuthStateModel> {
	@Selector()
	static getLoggedUser(state: AuthStateModel): any {
		return state.loggedUser;
	}

	@Action(SetLoggedUser)
	setUser(context: StateContext<AuthStateModel>, action: SetLoggedUser): void {
		const state = context.getState();
		context.setState({
			loggedUser: action.payload,
			isLogged: true,
		});
	}
}
