import { Component, Input, OnInit } from "@angular/core";
import { ClassroomMemberTypes } from "../models/classroom.models";
import { ClassroomService } from "../services/classroom.service";

@Component({
	selector: "classroom-classroom-list",
	templateUrl: "./classroom-list.component.html",
	styleUrls: ["./classroom-list.component.scss"],
})
export class ClassroomListComponent implements OnInit {
	@Input()
	memberType: ClassroomMemberTypes;

	classroomList: { classroomId: string; courseName: string }[];

	constructor(private classroomService: ClassroomService) {}

	ngOnInit(): void {
		this.fetchData(this.memberType);
	}

	fetchData(memberType: ClassroomMemberTypes) {
		this.classroomService.getClassroomList(this.memberType).subscribe((result) => {
			result.forEach((classroom) =>
				this.classroomList.push({
					classroomId: classroom.classroomId,
					courseName: classroom.courseName,
				})
			);
		});
	}
}
