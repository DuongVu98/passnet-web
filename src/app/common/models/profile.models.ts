export class JobFormDto {
    title: string;
    department: string;
    description: string;

    setTitle(title: string): JobFormDto {
		this.title = title;
		return this;
	}
	setDepartment(department: string): JobFormDto {
		this.department = department;
		return this;
	}
	setDescription(description: string): JobFormDto {
        this.description = description;
        return this;
	}
}