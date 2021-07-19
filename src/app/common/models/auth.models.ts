export class OrganizationLiteDto {
	id: string;
	name: string;
	location: string;
}
export class DepartmentDto {
	id: string;
	name: string;
	code: string;
}
export class RegisterForm {
	username: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	organizationId: string;
	departmentId: string;
	cardId: string;
	role: string;
}
