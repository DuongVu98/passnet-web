export class GoToClassroom {
	static readonly type = "[Classroom] GoToClassroom";

	constructor(public payload: { classroomId: string }) {}
}

export class SelectActiveTab {
	static readonly type = "[Classroom] SelectActiveTab";

	constructor(public payload: { activeTab: string }) {}
}
