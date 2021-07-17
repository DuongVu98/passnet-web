export class JobFormDto {
	jobTitle: string;
	courseName: string;
	requirement: string;
	content: string;
	semester: string;
}

export class ProfileDto {
	profileId: string;
	uid: string;
	username: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	classroomIds: string[];
	student?: {
		overview: string;
		experienceIds: string[];
		cardId: string;
	};
	teacher?: any;
}

export class ExperienceDto {
	profile: {
		profileId: string;
		email: string;
	};
	course: string;
	semester: string;
	description: string;
}

export class UpdateBasicInfoRequest {
	fullName: string;
	email: string;
	phoneNumber: string;
	overview: string;
	cardId?: string;
}

export class AddExperienceRequest {
	course: string;
	semester: string;
	description: string;
}
