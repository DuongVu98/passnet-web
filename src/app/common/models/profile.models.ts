export class JobFormDto {
	jobTitle: string;
	courseName: string;
	requirement: string;
	content: string;
	semester: string;

	withTitle(title: string): JobFormDto {
		this.jobTitle = title;
		return this;
	}
	withCourseName(courseName: string): JobFormDto {
		this.courseName = courseName;
		return this;
	}
	withRequirement(requirement: string): JobFormDto {
		this.requirement = requirement;
		return this;
	}
	withContent(content: string): JobFormDto {
		this.content = content;
		return this;
	}
	withSemester(semester: string): JobFormDto {
		this.semester = semester;
		return this;
	}
}
