import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RecruiterService } from "../services/recruiter.service";

@Component({
	selector: "profile-job-application-list",
	templateUrl: "./job-application-list.component.html",
	styleUrls: ["./job-application-list.component.scss"],
})
export class JobApplicationListComponent implements OnInit {
	jobApplicationList: [];

	constructor(private recruiterService: RecruiterService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData(): void {
		this.route.queryParams.subscribe((params) => {
			this.recruiterService.getJobApplicationList(params["jobId"]).subscribe((result) => {
				this.jobApplicationList = result.jobApplicationViewList;
			});
		});
	}
}
