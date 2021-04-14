import { Component, OnInit } from "@angular/core";
import { RecruiterApiService } from "../services/recruiter-api.service";
import { ApplicatorService } from "../services/applicator-api.service";
import { Router } from "@angular/router";

@Component({
	selector: "recruitment-recruitment-page",
	templateUrl: "./recruitment-page.component.html",
	styleUrls: ["./recruitment-page.component.scss"],
})
export class RecruitmentPageComponent implements OnInit {
	postedJobsView: {
		postedJobs: any[];
	};

	constructor(
		private recruiterApiService: RecruiterApiService,
		private applicatorApiService: ApplicatorService,
		private router: Router
	) {
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
