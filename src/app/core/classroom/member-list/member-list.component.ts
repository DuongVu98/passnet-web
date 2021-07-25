import { Component, OnInit } from "@angular/core";
import { ClassroomMemberTypes } from "../models/classroom.models";
import { ClassroomService } from "../services/classroom.service";

interface MemberView {
	profileId: string;
	name: string;
	email: string;
	studentId: string;
}

interface MemberTableView {}

@Component({
	selector: "classroom-member-list",
	templateUrl: "./member-list.component.html",
	styleUrls: ["./member-list.component.scss"],
})
export class MemberListComponent implements OnInit {
	lecturer: MemberView;
	assistants: MemberView[];
	students: MemberView[];

	displayedColumns: string[] = ["name", "email", "studentId"];

	constructor(private classroomService: ClassroomService) {}

	ngOnInit(): void {
		this.classroomService.getClassroomMembers().subscribe((result) => {
			this.lecturer = result
				.filter((mem) => mem.role === ClassroomMemberTypes.LECTURER.toString())
				.map((mem) => {
					return {
						profileId: mem.profileId,
						name: "",
						email: "",
						studentId: "",
					};
				})
				.map((mem) => {
					this.classroomService.getMemberName(mem.profileId).subscribe((name) => {
						mem.name = name.email;
						mem.email = name.email;
					});
					return mem;
				})[0];
			this.assistants = result
				.filter((mem) => mem.role === ClassroomMemberTypes.ASSISTANT.toString())
				.map((mem) => {
					return {
						profileId: mem.profileId,
						name: "",
						email: "",
						studentId: "",
					};
				})
				.map((mem) => {
					this.classroomService.getMemberName(mem.profileId).subscribe((name) => {
						mem.name = name.name;
						mem.email = name.email;
						mem.studentId = name.studentId;
					});
					return mem;
				});
			this.students = result
				.filter((mem) => mem.role === ClassroomMemberTypes.STUDENT.toString())
				.map((mem) => {
					return {
						profileId: mem.profileId,
						name: "",
						email: "",
						studentId: "",
					};
				})
				.map((mem) => {
					this.classroomService.getMemberName(mem.profileId).subscribe((name) => {
						mem.name = name.name;
						mem.email = name.email;
						mem.studentId = name.studentId;
					});
					return mem;
				});
		});
	}
}
