import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { SelectActiveTab } from "../store/classroom.actions";
import { ActiveTabSelection, ClassroomState } from "../store/classroom.state";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { ClassroomSpaceService } from "../services/classroom-space.service";

@Component({
	selector: "classroom-classroom-space",
	templateUrl: "./classroom-space.component.html",
	styleUrls: ["./classroom-space.component.scss"],
})
export class ClassroomSpaceComponent implements OnInit {
	@Select(ClassroomState.getActiveClassroomTab)
	activeTab$: Observable<ActiveTabSelection>;

	readonly navigations: any[];
	courseName: string;
	classCode: string;

	constructor(private store: Store, private router: Router, private spaceService: ClassroomSpaceService) {
		this.navigations = [
			{
				name: "Discussion",
				link: "discussion",
				icon: "groups",
			},
			{
				name: "Assignments",
				link: "assignments",
				icon: "assignment_turned_in",
			},
			{
				name: "Students",
				link: "students",
				icon: "face",
			},
			{
				name: "Files",
				link: "files",
				icon: "description",
			},
		];
		this.courseName = "";
		this.classCode = "";
	}

	ngOnInit() {
		this.activeTab$.subscribe((activeTab) => {
			this.router.navigate([`classrooms/space/${activeTab.selectedTab}`]);
		});

		this.fetchData();
	}

	fetchData(): void {
		this.spaceService.getClassroomView().subscribe((classroomView) => {
			this.courseName = classroomView.courseName;
			this.classCode = classroomView.code;
		});
	}

	selectTab(link: string): void {
		this.store.dispatch(new SelectActiveTab({ activeTab: link }));
	}
}
