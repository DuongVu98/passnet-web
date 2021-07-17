import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Builder } from "builder-pattern";
import { JobFormDto } from "src/app/common/models/profile.models";
import { RecruiterApiService } from "../services/recruiter-api.service";

interface DepartmentOption {
	name: string;
	id: string;
}

@Component({
	selector: "recruitment-add-job-form",
	templateUrl: "./add-job-form.component.html",
	styleUrls: ["./add-job-form.component.scss"],
})
export class AddJobFormComponent implements OnInit {
	loading = false;
	departments: DepartmentOption[];
	addJobForm: FormGroup;

	constructor(private recruiterService: RecruiterApiService) {
		this.departments = [
			{ name: "Computer Science", id: "dep1" },
			{ name: "Biotechnology", id: "dep2" },
			{ name: "Business Administrator", id: "dep2" },
			{ name: "Civil Engineering", id: "dep3" },
			{ name: "Industial Engineer and Management", id: "dep4" },
		];
		this.addJobForm = new FormGroup({
			title: new FormControl(""),
			courseName: new FormControl(""),
			department: new FormControl({ name: "", id: "" }),
			jobDescription: new FormControl(""),
			requirement: new FormControl(""),
			semester: new FormControl(""),
		});
	}

	ngOnInit(): void {}

	onSubmit(): void {
		this.loading = true;
		this.recruiterService
			.addNewJob(
				Builder(JobFormDto)
					.jobTitle(this.addJobForm.value.title)
					.courseName(this.addJobForm.value.courseName)
					.content(this.addJobForm.value.jobDescription)
					.requirement(this.addJobForm.value.requirement)
					.semester(this.addJobForm.value.semester)
					.build()
			)
			.subscribe(() => {
				this.loading = false;
			});
	}
}
