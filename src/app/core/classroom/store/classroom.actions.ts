export class GoToClassroom {
	static readonly type = "[Classroom] GoToClassroom";

	constructor(public payload: { classroomId: string }) {}
}
