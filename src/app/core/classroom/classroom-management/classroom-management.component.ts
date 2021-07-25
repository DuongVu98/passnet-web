import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { ProfileSelection, ProfileState, ProfileTypeSelection } from "../../profile/store/profile.state";
import { ClassroomMemberTypes } from "../models/classroom.models";

@Component({
	selector: "classroom-classroom-management",
	templateUrl: "./classroom-management.component.html",
	styleUrls: ["./classroom-management.component.scss"],
})
export class ClassroomManagementComponent implements OnInit {
	studentType: ClassroomMemberTypes;
	teacherAssistanceType: ClassroomMemberTypes;
	teacherType: ClassroomMemberTypes;

	profileType: string;

	@Select(ProfileState.getProfileType)
	profileTypeSelection$: Observable<ProfileTypeSelection>;

	constructor() {
		this.studentType = ClassroomMemberTypes.STUDENT;
		this.teacherAssistanceType = ClassroomMemberTypes.ASSISTANT;
		this.teacherType = ClassroomMemberTypes.LECTURER;
		this.profileType = "";
	}

	ngOnInit(): void {
		this.profileTypeSelection$.subscribe((state) => {
			this.profileType = state.profileType;
		});
	}

	isLecturer(): boolean {
		return this.profileType === "TEACHER";
	}
}
