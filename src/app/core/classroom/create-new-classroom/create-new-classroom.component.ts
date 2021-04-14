import { Component, OnInit } from "@angular/core";
import { ClassroomService } from "../services/classroom.service";

@Component({
	selector: "classroom-create-new-classroom",
	templateUrl: "./create-new-classroom.component.html",
	styleUrls: ["./create-new-classroom.component.scss"],
})
export class CreateNewClassroomComponent implements OnInit {
	selectedValue: string;
	ownedPostedJobsView: {
		jobId: string;
		jobTitle: string;
		courseName: string;
	}[];

	constructor(private classroomService: ClassroomService) {
		this.ownedPostedJobsView = [];
	}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData(): void {
		this.classroomService.getOwnPostedJobs().subscribe((result) => {
			this.ownedPostedJobsView = result.map((jobViewDto) => {
				return {
					jobId: jobViewDto.id,
					jobTitle: jobViewDto.jobTitle,
					courseName: jobViewDto.courseName,
				};
			});
		});
	}

	public submitCreateClassroomForm(): void {
		console.log(`submit -> ${JSON.stringify(this.selectedValue)}`);
	}
}
