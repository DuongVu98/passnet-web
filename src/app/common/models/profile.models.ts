export class JobFormDto {
    title: string;
    department: string;
    description: string;

    withTitle(title: string): JobFormDto {
		this.title = title;
		return this;
	}
	withDepartment(department: string): JobFormDto {
		this.department = department;
		return this;
	}
	withDescription(description: string): JobFormDto {
        this.description = description;
        return this;
	}
}