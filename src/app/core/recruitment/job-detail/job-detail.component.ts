import { Component, OnInit } from "@angular/core";
import { ApplicatorApiService } from "../services/applicator-api.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
	selector: "recruitment-job-detail",
	templateUrl: "./job-detail.component.html",
	styleUrls: ["./job-detail.component.scss"],
})
export class JobDetailComponent implements OnInit {
	jobId: string;
	jobDetail = {} as {
		teacher: string;
		jobTitle: string;
		courseName: string;
		description: string;
		requirement: string;
		semester: string;
	};
	isLoading: boolean;

	constructor(private route: ActivatedRoute, private applicatorApiService: ApplicatorApiService) {
		this.isLoading = true;
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
