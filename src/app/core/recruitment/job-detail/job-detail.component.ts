import { Component, OnInit, ViewChild } from "@angular/core";
import { ApplicatorService } from "../services/applicator-api.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ApplicationForm, JobDetail } from "../models/recruitment.models";
import { ApplicationFormComponent } from "../application-form/application-form.component";

@Component({
	selector: "recruitment-job-detail",
	templateUrl: "./job-detail.component.html",
	styleUrls: ["./job-detail.component.scss"],
})
export class JobDetailComponent implements OnInit {
	jobId: string;
	jobDetail: JobDetail;
	isLoading: boolean;

	applicationFormDialog: boolean;

	@ViewChild(ApplicationFormComponent)
	recruitmentApplicationForm: ApplicationFormComponent;

	constructor(private route: ActivatedRoute, private applicatorApiService: ApplicatorService) {
		this.isLoading = true;
		this.jobDetail = {} as JobDetail;
		this.applicationFormDialog = false;
	}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData(): void {
		this.route.queryParams.subscribe((params) => {
			this.jobId = params["jobId"];

			this.applicatorApiService.getJobDetail(this.jobId).subscribe((res) => {
				this.jobDetail.teacher = res.teacherId;
				this.jobDetail.courseName = res.courseName;
				this.jobDetail.jobTitle = res.jobTitle;
				this.jobDetail.description = res.content;
				this.jobDetail.requirement = res.requirement;
				this.jobDetail.semester = res.semester;

				this.isLoading = false;
			});
		});
	}

	onClickApply(): void {
		console.log(this.jobId);
		this.applicationFormDialog = true;
	}

	send(): void {
		this.recruitmentApplicationForm.send();
	}
}
