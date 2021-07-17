export class ChangeTabViewAction {
	static readonly type = "[Profile] ChangeTabView";
	constructor(
		public payload: {
			tabIndex: number;
		}
	) {}
}

export class SetStudentProfileAction {
	static readonly type = "[Profile] SetStudentProfile";
	constructor(
		public payload: {
			fullName: string;
			email: string;
			phoneNumber: string;
			overview: string;
			cardId: string;
		}
	) {}
}

export class SetTeacherProfileAction {
	static readonly type = "[Profile] SetTeacherProfile";
	constructor(
		public payload: {
			fullName: string;
			email: string;
			phoneNumber: string;
			overview: string;
		}
	) {}
}
