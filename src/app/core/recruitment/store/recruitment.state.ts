import { NgxsDataRepository } from "@ngxs-labs/data/repositories";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { StateRepository, Persistence } from "@ngxs-labs/data/decorators";
import { SetMenuActiveItemAction } from "./recruitment.action";

export class RecruitmentStateModel {
	menu: {
		activeItem: string;
	};
}

const initState: RecruitmentStateModel = {
	menu: {
		activeItem: "browser",
	},
};

@Persistence()
@StateRepository()
@State<RecruitmentStateModel>({
	name: "recruitment",
	defaults: initState,
})
export class RecruitmentState extends NgxsDataRepository<RecruitmentStateModel> {
	@Selector()
	static getMenuActiveItem(state: RecruitmentStateModel): MenuActiveItemSelector {
		return new MenuActiveItemSelector(state.menu.activeItem);
	}

	@Action(SetMenuActiveItemAction)
	setMenuActiveItem(context: StateContext<RecruitmentStateModel>, action: SetMenuActiveItemAction) {
		context.setState({
			menu: {
				activeItem: action.payload.item,
			},
		});
	}
}

export class MenuActiveItemSelector {
	constructor(public item: string) {}
}
