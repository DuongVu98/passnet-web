import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ApplicationForm } from "../models/recruitment.models";
import { ApplicatorService } from "../services/applicator-api.service";

interface DepartmentOption {
	name: string;
	id: string;
}

@Component({
	selector: "recruitment-application-form",
	templateUrl: "./application-form.component.html",
	styleUrls: ["./application-form.component.scss"],
})
export class ApplicationFormComponent implements OnInit {
	loading = false;
	departments: DepartmentOption[] = [
		{ name: "Computer Science", id: "dep1" },
		{ name: "Computer Science", id: "dep1" },
		{ name: "Computer Science", id: "dep1" },
		{ name: "Computer Science", id: "dep1" },
	];
	selectedDepartment: DepartmentOption;

	@Input()
	jobId: string;

	applicationFormGroup: FormGroup = new FormGroup({
		fullName: new FormControl(""),
		gpa: new FormControl(""),
		major: new FormControl(""),
		letter: new FormControl(""),
		selectedDepartment: new FormControl({ name: "", id: "" }),
	});

	constructor(private applicatorService: ApplicatorService) {}

	ngOnInit(): void {}

	send(): void {
		this.loading = true;
		const applicationForm: ApplicationForm = {
			fullName: this.applicationFormGroup.value.fullName,
			gpa: this.applicationFormGroup.value.gpa,
			major: this.applicationFormGroup.value.major,
			letter: this.applicationFormGroup.value.letter,
		};

		this.applicatorService.sendApplicationForm(applicationForm, this.jobId).subscribe(() => {
			this.loading = false;
		});
	}
}
