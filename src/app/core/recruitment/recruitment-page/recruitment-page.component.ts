import { Component, OnInit } from "@angular/core";
import { RecruiterApiService } from "../services/recruiter-api.service";
import { ApplicatorApiService } from "../services/applicator-api.service";
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
		private applicatorApiService: ApplicatorApiService,
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
			this.postedJobsView.postedJobs = result.litePostedJobs;
			console.log(this.postedJobsView);
		});
	}

	goToJobDetail(jobId: string) {
		console.log(jobId);
		this.router.navigate(["/job-detail"], {
			queryParams: {
				jobId: jobId,
			},
		});
	}

	quickApplyJob(jobId: string) {
		console.log(jobId);
	}
}
