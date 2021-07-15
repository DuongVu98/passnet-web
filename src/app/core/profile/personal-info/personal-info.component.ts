import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProfileService } from "../services/profile.service";
import { MenuItem } from "primeng/api";

interface PersonalInfo {
	fullName: string;
	username: string;
	email: string;
	univerity: string;
	cardId: string;
	experiences: Experience[];
}

interface Experience {
	course: string;
	semester: string;
	description: string;
}

@Component({
	selector: "profile-personal-info",
	templateUrl: "./personal-info.component.html",
	styleUrls: ["./personal-info.component.scss"],
})
export class PersonalInfoComponent implements OnInit, OnDestroy {
	personalInfo: PersonalInfo;

	subscriptions: Subscription[];
	menuItems: MenuItem[];
	constructor(private profileService: ProfileService) {
		this.personalInfo = {
			fullName: "",
			username: "",
			email: "",
			univerity: "",
			cardId: "",
			experiences: [],
		};
		this.menuItems = [
			{
				label: "Edit",
				icon: "pi pi-fw pi-pencil",
				command: () => this.openProfileEditForm(),
			},
		];
		this.subscriptions = [];
	}
	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => {
			sub.unsubscribe();
		});
	}

	ngOnInit(): void {
		this.subscriptions.push(
			this.profileService.getPersonalInfo().subscribe((result) => {
				this.personalInfo.fullName = result.fullName;
				this.personalInfo.username = result.username;
				this.personalInfo.email = result.email;
			}),
			this.profileService.getExperiencesByProfile().subscribe((result) => {
				result.forEach((r) => {
					this.personalInfo.experiences.push({
						course: r.course,
						semester: r.semester,
						description: r.description,
					});
				});
			})
		);
	}

	openProfileEditForm(): void {
		console.log("hello");
	}
}
