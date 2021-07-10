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
	@Input()
	jobId: string;

	loading = false;
	departments: DepartmentOption[];
	selectedDepartment: DepartmentOption;
	applicationFormGroup: FormGroup;

	constructor(private applicatorService: ApplicatorService) {
		this.loading = false;
		this.departments = [
			{ name: "Computer Science", id: "dep1" },
			{ name: "Biotechnology", id: "dep2" },
			{ name: "Business Administrator", id: "dep2" },
			{ name: "Civil Engineering", id: "dep3" },
		];
		this.applicationFormGroup = new FormGroup({
			fullName: new FormControl(""),
			gpa: new FormControl(""),
			major: new FormControl(""),
			letter: new FormControl(""),
			selectedDepartment: new FormControl({ name: "", id: "" }),
		});
	}

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
