import { Component, OnInit } from "@angular/core";
import { RecruiterApiService } from "../services/recruiter-api.service";
import { ApplicatorApiService } from "../services/applicator-api.service";

@Component({
	selector: "recruitment-recruitment-page",
	templateUrl: "./recruitment-page.component.html",
	styleUrls: ["./recruitment-page.component.scss"],
})
export class RecruitmentPageComponent implements OnInit {
	postedJobsView: {
		postedJobs: any[];
	} = {
		postedJobs: [],
	};

	constructor(private recruiterApiService: RecruiterApiService, private applicatorApiService: ApplicatorApiService) {}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData(): void {
		this.recruiterApiService.getAllRecruiterPostedJobs().subscribe((result) => {
			this.postedJobsView = result.litePostedJobs;
		});
	}
}
