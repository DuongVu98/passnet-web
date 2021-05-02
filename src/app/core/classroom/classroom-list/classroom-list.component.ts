import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { CreateClassroomFormComponent } from "src/app/common/components/create-classroom-form/create-classroom-form.component";
import { CreateNewClassroomComponent } from "../create-new-classroom/create-new-classroom.component";
import { ClassroomMemberTypes } from "../models/classroom.models";
import { ClassroomService } from "../services/classroom.service";

@Component({
	selector: "classroom-classroom-list",
	templateUrl: "./classroom-list.component.html",
	styleUrls: ["./classroom-list.component.scss"],
})
export class ClassroomListComponent implements OnInit {
	displayAddClassroomForm: boolean = false;

	@Input()
	memberType: ClassroomMemberTypes;

	@ViewChild(CreateClassroomFormComponent)
	createNewClassroomComponent: CreateClassroomFormComponent;

	classroomList: { classroomId: string; courseName: string }[];

	constructor(private classroomService: ClassroomService) {
        this.classroomList = [];
    }

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

	openAddClassroomForm() {
		this.displayAddClassroomForm = true;
	}

	submitAndClose() {
		this.displayAddClassroomForm = false;
		this.createNewClassroomComponent.submitCreateClassroomForm();
	}
}
