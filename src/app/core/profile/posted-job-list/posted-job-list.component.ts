import { Component, OnInit } from "@angular/core";
import { RecruiterService } from "../services/recruiter.service";

@Component({
	selector: "profile-posted-job-list",
	templateUrl: "./posted-job-list.component.html",
	styleUrls: ["./posted-job-list.component.scss"],
})
export class PostedJobListComponent implements OnInit {
	ownedPostedJobsView: any[];

	constructor(private recruiterService: RecruiterService) {}

	ngOnInit(): void {
		this.fetchData();
		setInterval(() => {
			console.log(JSON.stringify(this.ownedPostedJobsView));
		}, 1000);
	}

	fetchData(): void {
		this.recruiterService.getOwnPostedJobs().subscribe(result => {
			this.ownedPostedJobsView = result.litePostedJobs;
		});
	}
}
