import { Component, OnDestroy, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { SelectActiveTab } from "../store/classroom.actions";
import { ActiveTabSelection, ClassroomState } from "../store/classroom.state";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
@Component({
	selector: "classroom-classroom-space",
	templateUrl: "./classroom-space.component.html",
	styleUrls: ["./classroom-space.component.scss"],
})
export class ClassroomSpaceComponent implements OnInit {
	@Select(ClassroomState.getActiveClassroomTab)
	activeTab$: Observable<ActiveTabSelection>;

	readonly navigations: any[];

	constructor(private store: Store, private router: Router) {
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
	}

	ngOnInit() {
		this.activeTab$.subscribe((activeTab) => {
			this.router.navigate([`classrooms/space/${activeTab.selectedTab}`]);
		});
	}

	selectTab(link: string): void {
		this.store.dispatch(new SelectActiveTab({ activeTab: link }));
	}
}
