import { NgxsDataRepository } from "@ngxs-labs/data/repositories";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { StateRepository, Persistence } from "@ngxs-labs/data/decorators";
import {
	ChangeTabViewAction,
	SetOrganizationForStudentAction,
	SetOrganizationForTeacherAction,
	SetStudentProfileAction,
	SetTeacherProfileAction,
} from "./profile.action";

export class ProfileStateModel {
	profile: {
		type: string;
		fullName: string;
		email: string;
		phoneNumber: string;
		overview: string;
	};
	organization: {
		organizationId: string;
		profileType: string;
		cardId?: string;
		departmentId?: string;
	};
	tabIndex: number;
}

const initState: ProfileStateModel = {
	profile: { type: "", fullName: "", email: "", phoneNumber: "", overview: "" },
	organization: { organizationId: "", profileType: "" },
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
	static getProfileType(state: ProfileStateModel): ProfileTypeSelection {
		return new ProfileTypeSelection(state.organization.profileType);
	}

	@Selector()
	static getProfile(state: ProfileStateModel): ProfileSelection {
		return new ProfileSelection({
			type: state.organization.profileType,
			fullName: state.profile.fullName,
			email: state.profile.email,
			phoneNumber: state.profile.phoneNumber,
			overview: state.profile.overview,
		});
	}

	@Selector()
	static getTabViewIndex(state: ProfileStateModel): TabViewSelection {
		return new TabViewSelection(state.tabIndex);
	}

	@Selector()
	static getStudentOrg(state: ProfileStateModel): StudentOrganizationSelection {
		return new StudentOrganizationSelection({
			organizationId: state.organization.organizationId,
			departmentId: state.organization.departmentId,
			cardId: state.organization.cardId,
		});
	}

	@Selector()
	static getTeacherOrg(state: ProfileStateModel): TeacherOrganizationSelection {
		return new TeacherOrganizationSelection({
			organizationId: state.organization.organizationId,
		});
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

	@Action(SetOrganizationForStudentAction)
	setOrganizationForStudent(context: StateContext<ProfileStateModel>, action: SetOrganizationForStudentAction): void {
		const state = context.getState();
		context.setState({
			...state,
			organization: {
				organizationId: action.payload.organizationId,
				profileType: action.payload.profileType,
				departmentId: action.payload.departmentId,
				cardId: action.payload.cardId,
			},
		});
	}

	@Action(SetOrganizationForTeacherAction)
	setOrganizationForTeacher(context: StateContext<ProfileStateModel>, action: SetOrganizationForTeacherAction): void {
		const state = context.getState();
		context.setState({
			...state,
			organization: {
				organizationId: action.payload.organizationId,
				profileType: action.payload.profileType,
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

export class StudentOrganizationSelection {
	constructor(
		public organization: {
			organizationId: string;
			departmentId: string;
			cardId: string;
		}
	) {}
}
export class TeacherOrganizationSelection {
	constructor(
		public organization: {
			organizationId: string;
		}
	) {}
}
export class ProfileTypeSelection {
	constructor(public profileType: string) {}
}
