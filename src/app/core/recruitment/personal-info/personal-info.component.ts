import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
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
	profileType: string;
	subcriptions: Subscription[];

	constructor(private personalInfoService: PersonalInfoService) {
		this.profileView = { fullName: "", university: "" };
		this.profileType = "";
		this.subcriptions = [];
	}

	ngOnInit(): void {
		this.subcriptions.push(
			this.personalInfoService.getPersonalInfo().subscribe((result) => {
				this.profileView.experiences = result.student.experienceIds.length | 0;
				this.profileView.fullName = result.fullName;

				this.subcriptions.push(
					this.personalInfoService.getOrgProfile().subscribe((orgProfile) => {
						this.profileView.university = orgProfile.organization.name;
						this.profileView.cardId = orgProfile.cardId || "";
						this.profileType = orgProfile.profileType;
					})
				);
			})
		);
	}

	ngOnDestroy(): void {
		this.subcriptions.forEach((sub) => sub.unsubscribe());
	}

	isStudent(): boolean {
		return this.profileType === "STUDENT";
	}
}
