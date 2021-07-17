import { NgxsDataRepository } from "@ngxs-labs/data/repositories";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { StateRepository, Persistence } from "@ngxs-labs/data/decorators";
import { ChangeTabViewAction, SetStudentProfileAction, SetTeacherProfileAction } from "./profile.action";

export class ProfileStateModel {
	profile: {
		type: string;
		fullName: string;
		email: string;
		phoneNumber: string;
		overview: string;
		cardId?: string;
	};
	tabIndex: number;
}

const initState: ProfileStateModel = {
	profile: { type: "", fullName: "", email: "", phoneNumber: "", overview: "" },
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
	static getProfile(state: ProfileStateModel): ProfileSelection {
		return new ProfileSelection({
			type: state.profile.type,
			fullName: state.profile.fullName,
			email: state.profile.email,
			phoneNumber: state.profile.phoneNumber,
			overview: state.profile.overview,
			cardId: state.profile.cardId,
		});
	}

	@Selector()
	static getTabViewIndex(state: ProfileStateModel): TabViewSelection {
		return new TabViewSelection(state.tabIndex);
	}

	@Action(ChangeTabViewAction)
	setTabView(context: StateContext<ProfileStateModel>, action: ChangeTabViewAction): void {
		const state = context.getState();
		context.setState({
			...state,
			tabIndex: action.payload.tabIndex,
		});
	}

	@Action(SetStudentProfileAction)
	setStudentProfile(context: StateContext<ProfileStateModel>, action: SetStudentProfileAction): void {
		const state = context.getState();
		context.setState({
			...state,
			profile: {
				type: "STUDENT",
				fullName: action.payload.fullName,
				email: action.payload.email,
				phoneNumber: action.payload.phoneNumber,
				overview: action.payload.overview,
				cardId: action.payload.cardId,
			},
		});
	}

	@Action(SetTeacherProfileAction)
	setTeacherProfile(context: StateContext<ProfileStateModel>, action: SetTeacherProfileAction): void {
		const state = context.getState();
		context.setState({
			...state,
			profile: {
				type: "TEACHER",
				fullName: action.payload.fullName,
				email: action.payload.email,
				phoneNumber: action.payload.phoneNumber,
				overview: action.payload.overview,
			},
		});
	}
}

export class TabViewSelection {
	constructor(public tabIndex: number) {}
}

export class ProfileSelection {
	constructor(
		public profile: {
			type: string;
			fullName: string;
			email: string;
			phoneNumber: string;
			overview: string;
			cardId?: string;
		}
	) {}
}
