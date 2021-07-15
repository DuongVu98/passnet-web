import { NgxsDataRepository } from "@ngxs-labs/data/repositories";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { StateRepository, Persistence } from "@ngxs-labs/data/decorators";
import { ChangeTabViewAction } from "./profile.action";

export class ProfileStateModel {
	tabIndex: number;
}

const initState: ProfileStateModel = {
	tabIndex: 0,
};

@Persistence()
@StateRepository()
@State<ProfileStateModel>({
	name: "profile",
	defaults: initState,
})
export class ProfileState extends NgxsDataRepository<ProfileStateModel> {
	@Selector()
	static getTabViewIndex(state: ProfileStateModel): TabViewSelection {
		return new TabViewSelection(state.tabIndex);
	}

	@Action(ChangeTabViewAction)
	setTabView(context: StateContext<ProfileStateModel>, action: ChangeTabViewAction): void {
		context.setState({
			tabIndex: action.payload.tabIndex,
		});
	}
}

export class TabViewSelection {
	constructor(public tabIndex: number) {}
}
