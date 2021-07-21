import { Component, OnDestroy, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { ProfileSelection, ProfileState } from "../../profile/store/profile.state";
import { PersonalInfoService } from "../services/personal-info.service";

interface ProfileView {
	fullName: string;
	university: string;
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
		this.profileView = { fullName: "", university: "" };
		this.subcriptions = [];
	}

	ngOnInit(): void {
		this.subcriptions.push(
			this.personalInfoService.getPersonalInfo().subscribe((result) => {
				this.profileView.experiences = result.student.experienceIds.length | 0;
				this.profileView.fullName = result.fullName;

				this.subcriptions.push(
					this.personalInfoService.getOrgProfile().subscribe((orgProfile) => {
						console.log(`university: ${orgProfile.organization.name}`);
						this.profileView.university = orgProfile.organization.name;
						this.profileView.cardId = orgProfile.cardId || "";
					})
				);
			})
		);
	}

	ngOnDestroy(): void {
		this.subcriptions.forEach((sub) => sub.unsubscribe());
	}
}
