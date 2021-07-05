import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApplicatorService } from "../services/applicator-api.service";
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

	constructor(private recruiterApiService: RecruiterApiService, private router: Router) {
		this.postedJobsView = {
			postedJobs: [],
		};
	}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData(): void {
		this.recruiterApiService.getAllRecruiterPostedJobs().subscribe((result) => {
			this.postedJobsView.postedJobs = result;
			console.log(this.postedJobsView);
		});
	}

	goToJobDetail(jobId: string): void {
		console.log(jobId);
		this.router.navigate(["/job-detail"], {
			queryParams: {
				jobId,
			},
		});
	}

	quickApplyJob(jobId: string): void {
		console.log(jobId);
	}
}
