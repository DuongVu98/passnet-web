import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProfileService } from "../services/profile.service";

@Component({
	selector: "profile-profile-page",
	templateUrl: "./profile-page.component.html",
	styleUrls: ["./profile-page.component.scss"],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
	fullName: string;

	subscriptions: Subscription[];

	constructor(private profileService: ProfileService) {
		this.fullName = "";
		this.subscriptions = [];
	}

	ngOnInit(): void {
		this.subscriptions.push(
			this.profileService.getPersonalInfo().subscribe((result) => {
				this.fullName = result.fullName;
			})
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => {
			sub.unsubscribe();
		});
	}
}
