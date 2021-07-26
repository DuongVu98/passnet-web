import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { RecruiterService } from "../../profile/services/recruiter.service";
import { ApplicatorService } from "../services/applicator-api.service";
import { PersonalInfoService } from "../services/personal-info.service";

interface JobDetailView {
	jobTitle: string;
	courseName: string;
	description: string;
	requirement: string;
	semester: string;
}

interface JobApplicationView {
	id: string;
	studentId: string;
	candidateName: string;
	letter: string;
	state: string;
}

@Component({
	selector: "recruitment-job-application-list",
	templateUrl: "./job-application-list.component.html",
	styleUrls: ["./job-application-list.component.scss"],
})
export class JobApplicationListComponent implements OnInit, OnDestroy {
	jobId: string;
	jobDetail: JobDetailView;
	jobApplicationList: JobApplicationView[];
	selectedJobApplication: JobApplicationView;
	noApplicationSelected: boolean;

	subscriptions: Subscription[];

	constructor(
		private recruiterService: RecruiterService,
		private personalInfoService: PersonalInfoService,
		private applicatorService: ApplicatorService,
		private route: ActivatedRoute
	) {
		this.jobId = "";
		this.jobDetail = {
			jobTitle: "",
			courseName: "",
			description: "",
			requirement: "",
			semester: "",
		};
		this.jobApplicationList = [];
		this.noApplicationSelected = true;
		this.selectedJobApplication = {
			id: "",
			studentId: "",
			candidateName: "",
			letter: "",
			state: "",
		};
		this.subscriptions = [];
	}

	ngOnInit(): void {
		this.subscriptions.push(
			this.route.queryParams.subscribe((params) => {
				this.subscriptions.push(
					this.recruiterService.getJobApplicationList(params["jobId"]).subscribe((result) => {
						this.jobId = result.job.id;
						result.applications.map((application) => {
							console.log(`log state: ${application.state}`);
							this.subscriptions.push(
								this.personalInfoService
									.getPersonalInfoById(application.studentId)
									.subscribe((candidateInfo) => {
										this.jobApplicationList.push({
											id: application.id,
											studentId: application.studentId,
											candidateName: candidateInfo.fullName,
											letter: application.letter,
											state: application.state,
										});
									})
							);
						});

						this.subscriptions.push(
							this.applicatorService.getJobDetail(result.job.id).subscribe((res) => {
								this.jobDetail.jobTitle = res.jobTitle;
								this.jobDetail.courseName = res.courseName;
								this.jobDetail.requirement = res.requirement;
								this.jobDetail.semester = res.semester;
							})
						);
					})
				);
			})
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}

	selectJobApplicationDetail(applicationId: string): void {
		this.selectedJobApplication = this.jobApplicationList.find((application) => application.id === applicationId);
		this.setNoApplicationSelected();
	}

	acceptApplication(applicationId: string): void {
		this.recruiterService.acceptApplicationForm(applicationId, this.jobId).subscribe();
	}

	setNoApplicationSelected() {
		this.noApplicationSelected = false;
	}
}
