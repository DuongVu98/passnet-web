import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Builder } from "builder-pattern";
import { JobFormDto } from "src/app/common/models/profile.models";
import { RecruiterService } from "../services/recruiter.service";

interface SemesterView {
	id: string;
	displayName: string;
}

@Component({
	selector: "profile-add-job-form",
	templateUrl: "./add-job-form.component.html",
	styleUrls: ["./add-job-form.component.scss"],
})
export class AddJobFormComponent implements OnInit {
	loading = false;
	addJobForm: FormGroup;
	semesters: SemesterView[];

	constructor(private recruiterService: RecruiterService) {
		this.semesters = [{ id: "id", displayName: "name" }];
		this.addJobForm = new FormGroup({
			title: new FormControl(""),
			courseName: new FormControl(""),
			jobDescription: new FormControl(""),
			requirement: new FormControl(""),
			semester: new FormControl(""),
		});
	}

	ngOnInit(): void {
		this.recruiterService.getSemesters().subscribe((result) => {
			this.semesters = result.map((sem) => {
				return {
					id: sem.id,
					displayName: `${sem.name} (${sem.startMonth} - ${sem.endMonth})`,
				};
			});
		});
	}

	onSubmit(): void {
		this.loading = true;
		console.log(`log sem id: ${this.addJobForm.value.semester.id}`);
		this.recruiterService
			.addNewJob(
				Builder(JobFormDto)
					.jobTitle(this.addJobForm.value.title)
					.courseName(this.addJobForm.value.courseName)
					.content(this.addJobForm.value.jobDescription)
					.requirement(this.addJobForm.value.requirement)
					.semester(this.addJobForm.value.semester.id)
					.organizationId("")
					.build()
			)
			.subscribe(() => {
				this.loading = false;
			});
	}
}
