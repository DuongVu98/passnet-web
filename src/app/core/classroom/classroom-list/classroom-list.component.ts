import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { CreateClassroomFormComponent } from "src/app/common/components/create-classroom-form/create-classroom-form.component";
import { ClassroomMemberTypes } from "../models/classroom.models";
import { ClassroomService } from "../services/classroom.service";
import { GoToClassroom } from "../store/classroom.actions";

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

	constructor(private classroomService: ClassroomService, private store: Store, private router: Router) {
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

	goToClassroom(classroomId: string) {
		this.store.dispatch(new GoToClassroom({ classroomId }));
		this.router.navigate(["/classrooms/space"]);
	}

	openAddClassroomForm() {
		this.displayAddClassroomForm = true;
	}

	submitAndClose() {
		this.displayAddClassroomForm = false;
		this.createNewClassroomComponent.submitCreateClassroomForm();
	}
}
