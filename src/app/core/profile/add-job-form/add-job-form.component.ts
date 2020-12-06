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
		this.recruiterService.addNewJob(
			new JobFormModel()
				.withTitle(this.addJobForm.value.title)
				.withCourseName(this.addJobForm.value.courseName)
				.withDepartment(this.addJobForm.value.department)
				.withRequirement(this.addJobForm.value.requirement)
				.withContent(this.addJobForm.value.jobDescription)
				.withSemester(this.addJobForm.value.semester)
		);
	}
}
