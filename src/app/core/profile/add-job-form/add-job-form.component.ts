import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
	selector: "profile-add-job-form",
	templateUrl: "./add-job-form.component.html",
	styleUrls: ["./add-job-form.component.scss"],
})
export class AddJobFormComponent implements OnInit {
	departmentSelectInput: string;
	departmentsList = [
		"Computer Science",
		"Biotechlogy",
		"Business Administration",
		"Industial Engineer and Management",
	];
	constructor() {}

	ngOnInit(): void {}
}
