import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin, from, merge, Observable, of } from "rxjs";
import { map, mergeMap, toArray } from "rxjs/operators";
import { ApplicationFormComponent } from "../application-form/application-form.component";
import { RecruiterService } from "../services/recruiter-api.service";

@Component({
	selector: "recruitment-jobs-browser",
	templateUrl: "./jobs-browser.component.html",
	styleUrls: ["./jobs-browser.component.scss"],
})
export class JobsBrowserComponent implements OnInit {
	postedJobs$: Observable<any[]>;
	applicationFormDialog: boolean;
	jobIdToApply: string;

	@ViewChild(ApplicationFormComponent)
	recruitmentApplicationForm: ApplicationFormComponent;

	constructor(private recruiterApiService: RecruiterService, private router: Router) {
		this.applicationFormDialog = false;
		this.jobIdToApply = "";
	}

	ngOnInit(): void {
		this.postedJobs$ = this.recruiterApiService.getAllRecruiterPostedJobs().pipe(
			mergeMap((results) => from(results)),
			mergeMap((job) =>
				forkJoin({
					id: of(job.id),
					courseName: of(job.courseName),
					jobTitle: of(job.jobTitle),
					semester: this.recruiterApiService.getSemester(job.semester),
					department: of(job.department),
					appliedAmount: of(job.appliedAmount),
					daysAgo: of(job.daysAgo),
				})
			),
			toArray()
		);
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
