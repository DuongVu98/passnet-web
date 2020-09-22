export class JobFormModel {
	courseName: string;
	department: string;
	jobDescription: string;

	setCourseName(courseName: string): JobFormModel {
		this.courseName = courseName;
		return this;
	}
	setDepartment(department: string): JobFormModel {
		this.department = department;
		return this;
	}
	setJobDescription(jobDescription: string): JobFormModel {
        this.jobDescription = jobDescription;
        return this;
	}
}
