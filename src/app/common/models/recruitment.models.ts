export class ApplicationFormDto {
	letter: string;
	content: string;

	withLetter(letter: string): ApplicationFormDto {
		this.letter = letter;
		return this;
	}
	withContent(content: string): ApplicationFormDto {
		this.content = content;
		return this;
	}
}

export class JobViewDto {
	id: string;
	courseName: string;
	jobTitle: string;
	semester: string;
	department: string;
	appliedAmount: number;
}

export class JobDetailViewDto {
	jobTitle: string;
	teacherId: string;
	courseName: string;
	content: string;
	requirement: string;
	semester: string;
}

export class JobViewListDto {
	litePostedJobs: JobViewDto[];
}

export class JobApplicationDto {
	studentId: string;
	letter: string;
	content: string;
	state: string;
}

export class JobApplicationListDto {
	jobView: JobViewDto;
	jobApplicationViewList: JobApplicationDto[];
}

export class SemesterDto {
	id: string;
	name: string;
	startMonth: string;
	endMonth: string;
}
