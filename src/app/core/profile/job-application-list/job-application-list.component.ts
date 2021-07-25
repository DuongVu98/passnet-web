import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { ProfileService } from "../services/profile.service";
import { RecruiterService } from "../services/recruiter.service";

interface JobApplicationView {
	id: string;
	studentId: string;
	candidateName: string;
	letter: string;
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
	selectedJobApplication: JobApplicationView;
	noApplicationSelected: boolean;

	constructor(
		private recruiterService: RecruiterService,
		private profileService: ProfileService,
		private route: ActivatedRoute
	) {
		this.jobId = "";
		this.jobApplicationList = [];
		this.noApplicationSelected = true;
		this.selectedJobApplication = {
			id: "",
			studentId: "",
			candidateName: "",
			letter: "",
			state: "",
		};
	}

	ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			this.recruiterService.getJobApplicationList(params["jobId"]).subscribe((result) => {
				this.jobId = result.job.id;
				result.applications.map((application) => {
					this.profileService.getPersonalInfoById(application.studentId).subscribe((candidateInfo) => {
						this.jobApplicationList.push({
							id: "",
							studentId: application.studentId,
							candidateName: candidateInfo.fullName,
							letter: application.letter,
							state: application.state,
						});
					});
				});
			});
		});
	}

	selectJobApplicationDetail(applicationId: string): void {
		this.selectedJobApplication = this.jobApplicationList.filter(
			(application) => application.id === applicationId
		)[0];
		this.setNoApplicationSeleted();
	}

	acceptApplication(applicationId: string): void {
		this.recruiterService.acceptApplicationForm(applicationId, this.jobId).subscribe();
	}

	setNoApplicationSeleted() {
		this.noApplicationSelected = this.selectedJobApplication.id === "" ? false : true;
	}
}
