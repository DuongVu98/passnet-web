import { Component, OnDestroy, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { ProfileService } from "../services/profile.service";
import { ChangeTabViewAction } from "../store/profile.action";
import { ProfileSelection, ProfileState, TabViewSelection } from "../store/profile.state";

@Component({
	selector: "profile-profile-page",
	templateUrl: "./profile-page.component.html",
	styleUrls: ["./profile-page.component.scss"],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
	fullName: string;
	overview: string;
	tabViewIndex: number;
	subscriptions: Subscription[];

	@Select(ProfileState.getTabViewIndex)
	tabView$: Observable<TabViewSelection>;

	@Select(ProfileState.getProfile)
	profile$: Observable<ProfileSelection>;

	constructor(private profileService: ProfileService, private store: Store) {
		this.fullName = "";
		this.overview = "";
		this.subscriptions = [];
		this.tabViewIndex = 0;
	}

	ngOnInit(): void {
		this.subscriptions.push(
			this.profileService.getPersonalInfo().subscribe((result) => {
				this.fullName = result.fullName;
			})
		);
		this.tabView$.subscribe((state) => {
			this.tabViewIndex = state.tabIndex;
		});
		this.profile$.subscribe((state) => {
			this.overview = state.profile.overview;
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => {
			sub.unsubscribe();
		});
	}

	handleChange(event): void {
		this.store.dispatch(new ChangeTabViewAction({ tabIndex: event.index }));
	}
}
