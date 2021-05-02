import { NgxsDataRepository } from "@ngxs-labs/data/repositories";
import { StateRepository, Persistence } from "@ngxs-labs/data/decorators";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GoToClassroom } from "./classroom.actions";

export class ClassroomStateModel {
	activeClassroom: {
		classroomId: string;
		activeTab: string;
	};
}

const initState: ClassroomStateModel = {
	activeClassroom: null,
};

@Persistence()
@StateRepository()
@State<ClassroomStateModel>({ name: "classroom", defaults: initState })
export class ClassroomState extends NgxsDataRepository<ClassroomStateModel> {
	@Selector()
	static getActiveClassroom(state: ClassroomStateModel): ActiveClassroomSelection {
		return new ActiveClassroomSelection(state.activeClassroom.classroomId);
	}

	@Selector()
	static getActiveClassroomTab(state: ClassroomStateModel): ActiveTabSelection {
		return new ActiveTabSelection(state.activeClassroom.activeTab);
	}

	@Action(GoToClassroom)
	setActiveClassroom(context: StateContext<ClassroomStateModel>, action: GoToClassroom): void {
		context.setState({
			activeClassroom: {
				classroomId: action.payload.classroomId,
				activeTab: "discussion",
			},
		});
	}
}

export class ActiveClassroomSelection {
	constructor(public classroomId: string) {}
}
export class ActiveTabSelection {
	constructor(public selectedTab: string) {}
}
