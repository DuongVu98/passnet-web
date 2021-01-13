import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RecruiterService } from "../services/recruiter.service";

@Component({
	selector: "profile-posted-job-list",
	templateUrl: "./posted-job-list.component.html",
	styleUrls: ["./posted-job-list.component.scss"],
})
export class PostedJobListComponent implements OnInit {
	ownedPostedJobsView: any[];

	constructor(private recruiterService: RecruiterService, private router: Router) {}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData(): void {
		this.recruiterService.getOwnPostedJobs().subscribe((result) => {
			this.ownedPostedJobsView = result.litePostedJobs;
		});
	}

	openJobApplicationList(jobId: string): void {
		this.router.navigate(["/profile/job-application-list"], { queryParams: { jobId: jobId } });
	}
}
