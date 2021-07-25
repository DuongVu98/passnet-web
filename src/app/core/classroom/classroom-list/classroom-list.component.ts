import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { CreateClassroomFormComponent } from "src/app/common/components/create-classroom-form/create-classroom-form.component";
import { JoinClassFormComponent } from "../join-class-form/join-class-form.component";
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

	constructor(
		private classroomService: ClassroomService,
		private store: Store,
		private router: Router,
		public dialog: MatDialog
	) {
		this.classroomList = [];
	}

	ngOnInit(): void {
		this.classroomService.getClassroomList(this.memberType).subscribe((result) => {
			this.classroomList = result.map((classroom) => {
				return {
					classroomId: classroom.classroomId,
					courseName: classroom.courseName,
				};
			});
		});
	}

	goToClassroom(classroomId: string) {
		this.store.dispatch(new GoToClassroom({ classroomId }));
		this.router.navigate(["/classrooms/space"]);
	}

	openAddClassroomForm() {
		switch (this.memberType) {
			case ClassroomMemberTypes.STUDENT:
				this.openJoinClassForm();
				break;
			case ClassroomMemberTypes.ASSISTANT:
				console.log("Browse Jobs");
				break;
			case ClassroomMemberTypes.LECTURER:
				this.displayAddClassroomForm = true;
				break;
		}
	}

	submitAndClose() {
		this.displayAddClassroomForm = false;
		this.createNewClassroomComponent.submitCreateClassroomForm();
	}

	addClassroomPresentation(): string {
		switch (this.memberType) {
			case ClassroomMemberTypes.STUDENT:
				return "Join";
			case ClassroomMemberTypes.ASSISTANT:
				return "Browse Jobs";
			case ClassroomMemberTypes.LECTURER:
				return "Add";
		}
	}

	openJoinClassForm(): void {
		const dialogRef = this.dialog.open(JoinClassFormComponent, {
			width: "400px",
			data: { studentId: "" },
		});
	}
}
