export class JobFormDto {
    courseName: string;
    department: string;
    jobDescription: string;

    setCourseName(courseName: string): JobFormDto {
		this.courseName = courseName;
		return this;
	}
	setDepartment(department: string): JobFormDto {
		this.department = department;
		return this;
	}
	setJobDescription(jobDescription: string): JobFormDto {
		this.jobDescription = jobDescription;
	}
}