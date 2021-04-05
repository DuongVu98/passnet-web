import { Component, OnInit } from "@angular/core";
import { ClassroomMemberTypes } from "../models/classroom.models";

@Component({
	selector: "classroom-classroom-management",
	templateUrl: "./classroom-management.component.html",
	styleUrls: ["./classroom-management.component.scss"],
})
export class ClassroomManagementComponent implements OnInit {
    studentType: ClassroomMemberTypes
    teacherAssistanceType: ClassroomMemberTypes
    teacherType: ClassroomMemberTypes

	constructor() {
        this.studentType = ClassroomMemberTypes.STUDENT
        this.teacherAssistanceType = ClassroomMemberTypes.TEACHER_ASSISTANCE
        this.teacherType = ClassroomMemberTypes.TEACHER
    }

	ngOnInit(): void {}
}
