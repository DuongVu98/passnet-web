export class JobFormModel {
	jobTitle: string;
	courseName: string;
	department: string;
	content: string;
	requirement: string;
	semester: string;

	withTitle(title: string): JobFormModel {
		this.jobTitle = title;
		return this;
	}
	withCourseName(courseName: string): JobFormModel {
		this.courseName = courseName;
		return this;
	}
	withDepartment(department: string): JobFormModel {
		this.department = department;
		return this;
	}
	withContent(content: string): JobFormModel {
		this.content = content;
		return this;
	}
	withRequirement(requirement: string): JobFormModel {
		this.requirement = requirement;
		return this;
	}
	withSemester(semester: string): JobFormModel {
		this.semester = semester;
		return this;
	}
}
