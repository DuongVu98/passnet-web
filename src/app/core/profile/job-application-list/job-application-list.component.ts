import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RecruiterService } from "../services/recruiter.service";

class JobApplicationView {
	id: string;
	studentId: string;
	letter: string;
	content: string;
	state: string;
}

@Component({
	selector: "profile-job-application-list",
	templateUrl: "./job-application-list.component.html",
	styleUrls: ["./job-application-list.component.scss"],
})
export class JobApplicationListComponent implements OnInit {
	jobId: string;
	jobApplicationList: JobApplicationView[];
	selectedJobApplication: JobApplicationView = {} as JobApplicationView;

	constructor(private recruiterService: RecruiterService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData(): void {
		this.route.queryParams.subscribe((params) => {
			this.recruiterService.getJobApplicationList(params["jobId"]).subscribe((result) => {
				this.jobId = result.id;
				this.jobApplicationList = result.jobApplicationViewList;
				this.selectedJobApplication = result.jobApplicationViewList[0];
			});
		});
	}

	selectJobApplicationDetail(applicationId: string): void {
		this.selectedJobApplication = this.jobApplicationList.filter(
			(application) => application.id === applicationId
		)[0];
	}

	acceptApplication(applicationId: string): void {
		this.recruiterService.acceptApplicationForm(applicationId, this.jobId).subscribe();
	}
}
