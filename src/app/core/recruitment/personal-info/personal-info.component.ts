import { Component, OnDestroy, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { ProfileSelection, ProfileState } from "../../profile/store/profile.state";
import { PersonalInfoService } from "../services/personal-info.service";

interface ProfileView {
	fullName: string;
	univerity: string;
	cardId?: string;
	experiences?: number;
}

@Component({
	selector: "recruitment-personal-info",
	templateUrl: "./personal-info.component.html",
	styleUrls: ["./personal-info.component.scss"],
})
export class PersonalInfoComponent implements OnInit, OnDestroy {
	profileView: ProfileView;
	subcriptions: Subscription[];

	@Select(ProfileState.getProfile)
	profile$: Observable<ProfileSelection>;

	constructor(private personalInfoService: PersonalInfoService) {
		this.profileView = { fullName: "", univerity: "" };
		this.subcriptions = [];
	}

	ngOnInit(): void {
		this.subcriptions.push(
			this.profile$.subscribe((state) => {
				this.profileView.fullName = state.profile.fullName;
				this.profileView.cardId = state.profile.cardId || "";
			}),
			this.personalInfoService.getPersonalInfo().subscribe((result) => {
				this.profileView.experiences = result.student.experienceIds.length | 0;
			})
		);
	}

	ngOnDestroy(): void {
		this.subcriptions.forEach((sub) => sub.unsubscribe());
	}
}
