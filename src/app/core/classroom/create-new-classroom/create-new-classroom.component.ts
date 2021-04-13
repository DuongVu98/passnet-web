import { Component, OnInit } from "@angular/core";
import { ClassroomService } from "../services/classroom.service";
@Component({
	selector: "classroom-create-new-classroom",
	templateUrl: "./create-new-classroom.component.html",
	styleUrls: ["./create-new-classroom.component.scss"],
})
export class CreateNewClassroomComponent implements OnInit {
	selectedValue: string;
	ownedPostedJobsView: any[];

	constructor(private classroomService: ClassroomService) {}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData(): void {
		this.classroomService.getOwnPostedJobs().subscribe((result) => {
			this.ownedPostedJobsView = result.litePostedJobs;
		});
	}
}
