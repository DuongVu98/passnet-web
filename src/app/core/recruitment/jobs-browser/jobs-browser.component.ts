import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ApplicationFormComponent } from "../application-form/application-form.component";
import { RecruiterApiService } from "../services/recruiter-api.service";

@Component({
	selector: "recruitment-jobs-browser",
	templateUrl: "./jobs-browser.component.html",
	styleUrls: ["./jobs-browser.component.scss"],
})
export class JobsBrowserComponent implements OnInit {
	postedJobsView: {
		postedJobs: any[];
	};
	applicationFormDialog: boolean;
	jobIdToApply: string;

	@ViewChild(ApplicationFormComponent)
	recruitmentApplicationForm: ApplicationFormComponent;

	constructor(private recruiterApiService: RecruiterApiService, private router: Router) {
		this.postedJobsView = {
			postedJobs: [],
		};
		this.applicationFormDialog = false;
		this.jobIdToApply = "";
	}

	ngOnInit(): void {
		this.recruiterApiService.getAllRecruiterPostedJobs().subscribe((result) => {
			this.postedJobsView.postedJobs = result;
			result.forEach((job) => {
				this.recruiterApiService.getSemester(job.semester).subscribe((sem) => {
					job.semester = sem.name;
				});
			});
		});
	}

	goToJobDetail(jobId: string): void {
		console.log(jobId);
		this.router.navigate(["/recruitment/job-detail"], {
			queryParams: {
				jobId,
			},
		});
	}

	quickApplyJob(jobId: string): void {
		this.jobIdToApply = jobId;
		this.applicationFormDialog = true;
	}

	send() {
		this.applicationFormDialog = false;
		this.recruitmentApplicationForm.send();
	}
}
