import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AddJobFormComponent } from "../../profile/add-job-form/add-job-form.component";
import { RecruiterApiService } from "../services/recruiter-api.service";

interface OwnedJobView {
	id: string;
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
	constructor(private recruiterService: RecruiterApiService, private router: Router, private matDialog: MatDialog) {
		this.ownedJobList = [];
	}

	ngOnInit(): void {
		this.recruiterService.getOwnedPostedJobs().subscribe((result) => {
			result.forEach((jobView) => {
				this.ownedJobList.push({
					id: jobView.id,
					title: jobView.jobTitle,
					courseName: jobView.courseName,
					semester: jobView.semester,
					numberOfAlpplication: jobView.appliedAmount,
					postedDate: "",
				});
			});
		});
	}

	openAddJobFormModal(): void {
		const dialogRef = this.matDialog.open(AddJobFormComponent, {
			width: "60%",
		});
	}

	openJobApplicationList(jobId: string): void {
		this.router.navigate(["/recruitment/applications-list"], { queryParams: { jobId: jobId } });
	}

	openClassroomFromJob(jobId: string): void {}
}
