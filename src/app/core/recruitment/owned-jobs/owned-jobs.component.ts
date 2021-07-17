import { Component, OnInit } from "@angular/core";
import { RecruiterApiService } from "../services/recruiter-api.service";

interface OwnedJobView {
	title: string;
	courseName: string;
	semester: string;
	numberOfAlpplication: number;
	postedDate: string;
}

@Component({
	selector: "recruitment-owned-jobs",
	templateUrl: "./owned-jobs.component.html",
	styleUrls: ["./owned-jobs.component.scss"],
})
export class OwnedJobsComponent implements OnInit {
	ownedJobList: OwnedJobView[];
	constructor(private recruiterService: RecruiterApiService) {
		this.ownedJobList = [];
	}

	ngOnInit(): void {
		this.recruiterService.getOwnedPostedJobs().subscribe((result) => {
			result.forEach((jobView) => {
				this.ownedJobList.push({
					title: jobView.jobTitle,
					courseName: jobView.courseName,
					semester: jobView.semester,
					numberOfAlpplication: jobView.appliedAmount,
					postedDate: "",
				});
			});
		});
	}
}
