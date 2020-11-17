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
	addJobForm: FormGroup;

	constructor(private recruiterService: RecruiterService) {
		this.addJobForm = new FormGroup({
			courseName: new FormControl(""),
			department: new FormControl(""),
			jobDescription: new FormControl(""),
		});
	}

	ngOnInit(): void {}

	onSubmit(): void {
		this.recruiterService
			.addNewJob(
				new JobFormModel()
					.withCourseName(this.addJobForm.value.courseName)
					.withDepartment(this.addJobForm.value.department)
					.withJobDescription(this.addJobForm.value.jobDescription)
			)
			.then((serviceObservable$) => {
				console.log(serviceObservable$);
				serviceObservable$.subscribe();
			});
	}
}
