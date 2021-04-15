import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Builder } from "builder-pattern";
import { JobFormDto } from "src/app/common/models/profile.models";
import { RecruiterService } from "../services/recruiter.service";

@Component({
	selector: "profile-add-job-form",
	templateUrl: "./add-job-form.component.html",
	styleUrls: ["./add-job-form.component.scss"],
})
export class AddJobFormComponent implements OnInit {
	loading = false;
	departmentSelectInput: string;
	departmentsList = [
		"Computer Science",
		"Biotechlogy",
		"Business Administration",
		"Industial Engineer and Management",
	];
	addJobForm: FormGroup = new FormGroup({
		title: new FormControl(""),
		courseName: new FormControl(""),
		department: new FormControl(""),
		jobDescription: new FormControl(""),
		requirement: new FormControl(""),
		semester: new FormControl(""),
	});

	constructor(private recruiterService: RecruiterService) {}

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
