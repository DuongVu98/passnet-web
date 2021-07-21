export class OrganizationLiteDto {
	id: string;
	name: string;
	location: string;
}
export class DepartmentLiteDto {
	id: string;
	name: string;
	code: string;
}
export class OrgMemberDto {
	organization: OrganizationLiteDto;
	department?: DepartmentLiteDto;
	cardId?: string;
	profileType: string;
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
