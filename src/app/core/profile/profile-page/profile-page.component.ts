import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ApplicatorApiService } from "../../recruitment/services/applicator-api.service";
import { RecruiterApiService } from "../../recruitment/services/recruiter-api.service";
import { AddJobFormComponent } from "../add-job-form/add-job-form.component";

@Component({
	selector: "profile-profile-page",
	templateUrl: "./profile-page.component.html",
	styleUrls: ["./profile-page.component.scss"],
})
export class ProfilePageComponent implements OnInit {
	userProfile: any;
	postedJobsList: any[] = [];

	constructor(
		private recruiterApiService: RecruiterApiService,
		private applicatorApiService: ApplicatorApiService,
		private matDialog: MatDialog
	) {}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData(): void {
		this.recruiterApiService.getTeacherProfile("unique-id").subscribe((profile) => {
			this.userProfile = profile;
			this.userProfile.postedJobsId.forEach((jobId) => {
				this.applicatorApiService.getJobDetail(jobId).subscribe((job) => {
					this.postedJobsList.push(job);
				});
			});
		});
	}

	openAddJobFormModal(): void {
		this.matDialog.open(AddJobFormComponent);
	}
}
