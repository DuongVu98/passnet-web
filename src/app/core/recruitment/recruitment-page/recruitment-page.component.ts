import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { ProfileState, ProfileTypeSelection } from "../../profile/store/profile.state";
import { SetMenuActiveItemAction } from "../store/recruitment.action";
import { MenuActiveItemSelector, RecruitmentState } from "../store/recruitment.state";

@Component({
	selector: "recruitment-recruitment-page",
	templateUrl: "./recruitment-page.component.html",
	styleUrls: ["./recruitment-page.component.scss"],
})
export class RecruitmentPageComponent implements OnInit {
	activeItem: string;
	profileType: string;

	@Select(RecruitmentState.getMenuActiveItem)
	recruitmentMenuActiveItem$: Observable<MenuActiveItemSelector>;

	@Select(ProfileState.getProfileType)
	profileType$: Observable<ProfileTypeSelection>;

	constructor(private store: Store, private router: Router) {
		this.activeItem = "";
		this.profileType = "";
	}

	ngOnInit(): void {
		this.recruitmentMenuActiveItem$
			.subscribe((state) => {
				this.router.navigate([`/recruitment/${state.item}`]);
			})
			.unsubscribe();
		this.recruitmentMenuActiveItem$.subscribe((state) => {
			this.activeItem = state.item;
		});
		this.profileType$.subscribe((state) => {
			this.profileType = state.profileType;
		});
	}

	setActive(item: string): void {
		this.store.dispatch(new SetMenuActiveItemAction({ item: item }));
	}

	isTeacher(): boolean {
		return this.profileType === "TEACHER";
	}
}
