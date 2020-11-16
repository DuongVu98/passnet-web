export class JobFormModel {
	courseName: string;
	department: string;
	jobDescription: string;

	withCourseName(courseName: string): JobFormModel {
		this.courseName = courseName;
		return this;
	}
	withDepartment(department: string): JobFormModel {
		this.department = department;
		return this;
	}
	withJobDescription(jobDescription: string): JobFormModel {
        this.jobDescription = jobDescription;
        return this;
	}
}
