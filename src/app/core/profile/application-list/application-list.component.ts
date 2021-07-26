import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../services/profile.service";

interface ApplicationView {
	id: string;
	courseName: string;
	content: string;
	jobId: string;
	postedDate: string;
	state: string;
}

@Component({
	selector: "profile-application-list",
	templateUrl: "./application-list.component.html",
	styleUrls: ["./application-list.component.scss"],
})
export class ApplicationListComponent implements OnInit {
	applications: ApplicationView[];

	constructor(private profileService: ProfileService) {
		this.applications = [];
	}

	ngOnInit(): void {
		this.profileService.getOwnedApplications().subscribe((result) => {
			this.applications = result.map((application) => {
				return {
					id: application.id,
					courseName: application.course,
					content: application.content,
					jobId: application.jobId,
					postedDate: application.postedDate,
					state: application.state,
				};
			});
		});
	}
}
