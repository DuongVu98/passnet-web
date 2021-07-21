import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { Router } from "@angular/router";
import { Builder } from "builder-pattern";
import { Subscription } from "rxjs";
import { RegisterForm } from "src/app/common/models/auth.models";
import { AuthService } from "../services/auth.service";

interface OrganizationView {
	id: string;
	name: string;
	location: string;
}

interface Role {
	name: string;
	data: string;
}

interface DepartmentView {
	id: string;
	name: string;
	code: string;
}
@Component({
	selector: "auth-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit, OnDestroy {
	universities: OrganizationView[];
	departments: DepartmentView[];
	roles: Role[];

	basicInfoForm: FormGroup;
	organizationForm: FormGroup;
	authenticationForm: FormGroup;

	isStudent: boolean;
	isOrgSelected: boolean;
	hidePassword: boolean;
	submitting: boolean;

	subscriptions: Subscription[];

	constructor(private authService: AuthService, private router: Router) {
		this.universities = [];
		this.departments = [];
		this.roles = [
			{ name: "Student", data: "STUDENT" },
			{ name: "Lecturer", data: "TEACHER" },
		];
		this.isStudent = false;
		this.isOrgSelected = false;
		this.hidePassword = true;
		this.submitting = false;
		this.subscriptions = [];

		this.basicInfoForm = new FormGroup({
			firstName: new FormControl(""),
			lastName: new FormControl(""),
		});

		this.organizationForm = new FormGroup({
			organization: new FormControl(""),
			role: new FormControl(""),
			cardId: new FormControl(""),
			department: new FormControl(""),
		});

		this.authenticationForm = new FormGroup({
			username: new FormControl(""),
			email: new FormControl(""),
			password: new FormControl(""),
		});
	}

	ngOnInit(): void {
		this.subscriptions.push(
			this.authService.getAllOrganizations().subscribe((result) => {
				result.forEach((org) => {
					this.universities.push({
						id: org.id,
						name: org.name,
						location: org.location,
					});
				});
			})
		);
	}
	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => {
			sub.unsubscribe();
		});
	}

	onOrgChange(event: MatSelectChange): void {
		this.isOrgSelected = true;
		this.subscriptions.push(
			this.authService.getDepartments(event.value).subscribe((result) => {
				result.forEach((dep) => {
					this.departments.push({
						id: dep.id,
						name: dep.name,
						code: dep.code,
					});
				});
			})
		);
	}
	onRoleChange(event: MatSelectChange): void {
		this.isStudent = event.value === "STUDENT" ? true : false;
	}

	submit(): void {
		this.submitting = true;
		const registerForm: RegisterForm = Builder(RegisterForm)
			.firstName(this.basicInfoForm.value.firstName)
			.lastName(this.basicInfoForm.value.lastName)
			.username(this.basicInfoForm.value.username)
			.email(this.authenticationForm.value.email)
			.password(this.authenticationForm.value.password)
			.organizationId(this.organizationForm.value.organization)
			.departmentId(this.organizationForm.value.department)
			.cardId(this.organizationForm.value.cardId)
			.role(this.organizationForm.value.role)
			.build();
		this.authService.register(registerForm).subscribe(() => {
			this.router.navigate(["/login"]);
		});
	}
}
