import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { JobFormModel } from "../models/job-form.model";
import { RecruiterService } from "../services/recruiter.service";

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
	addJobForm = new FormGroup({
		courseName: new FormControl(""),
		department: new FormControl(""),
		jobDescription: new FormControl(""),
	});
	constructor(private recruiterService: RecruiterService) {}

	ngOnInit(): void {}

	onSubmit(): void {
		this.recruiterService.addNewJob(
			new JobFormModel()
				.setCourseName(this.addJobForm.value.courseName)
				.setDepartment(this.addJobForm.value.department)
				.setJobDescription(this.addJobForm.value.jobDescription)
		);
	}
}
