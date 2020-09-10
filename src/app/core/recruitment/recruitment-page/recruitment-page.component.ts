import { Component, OnInit } from "@angular/core";
import { RecruiterApiService } from "../services/recruiter-api.service";
import { ApplicatorApiService } from "../services/applicator-api.service";

@Component({
	selector: "recruitment-recruitment-page",
	templateUrl: "./recruitment-page.component.html",
	styleUrls: ["./recruitment-page.component.scss"],
})
export class RecruitmentPageComponent implements OnInit {
	jobsList = [];
	teacherProfile: any;

	constructor(private recruiterApiService: RecruiterApiService, private applicatorApiService: ApplicatorApiService) {}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData(): void {
		this.recruiterApiService.getTeacherProfile("unique-id").subscribe((profile) => {
			this.teacherProfile = profile;
			this.teacherProfile.postedJobsId.forEach((jobId) => {
				this.applicatorApiService.getJobDetail(jobId).subscribe((job) => {
					this.jobsList.push(job);
				});
			});
		});
	}
}
