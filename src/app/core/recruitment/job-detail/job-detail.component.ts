import { Component, OnInit } from "@angular/core";
import { ApplicatorApiService } from "../services/applicator-api.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { JobDetail } from "../models/recruitment.models";

@Component({
	selector: "recruitment-job-detail",
	templateUrl: "./job-detail.component.html",
	styleUrls: ["./job-detail.component.scss"],
})
export class JobDetailComponent implements OnInit {
	jobId: string;
	jobDetail: JobDetail;
	isLoading: boolean;

	constructor(private route: ActivatedRoute, private applicatorApiService: ApplicatorApiService) {
		this.isLoading = true;
		this.jobDetail = {} as JobDetail;
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
}
