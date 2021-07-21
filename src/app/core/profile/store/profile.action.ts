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

export class SetOrganizationForStudentAction {
	static readonly type = "[Profile] SetOrganization";
	constructor(
		public payload: {
			organizationId: string;
			departmentId: string;
			cardId: string;
			profileType: string;
		}
	) {}
}

export class SetOrganizationForTeacherAction {
	static readonly type = "[Profile] SetOrganization";
	constructor(
		public payload: {
			organizationId: string;
			profileType: string;
		}
	) {}
}
