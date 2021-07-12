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
	overview: string;
	classroomIds: string[];
	experienceIds: string[];
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
