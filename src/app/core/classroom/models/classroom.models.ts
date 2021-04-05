export enum ClassroomMemberTypes {
	TEACHER,
	TEACHER_ASSISTANCE,
	STUDENT,
}

export class ClassroomNameList {
	list: { classroomId: string; courseName: string }[];
}
