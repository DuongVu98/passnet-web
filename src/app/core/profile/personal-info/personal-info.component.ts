import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../services/profile.service";

interface PersonalInfo {
	fullName: string;
	username: string;
	email: string;
}

@Component({
	selector: "profile-personal-info",
	templateUrl: "./personal-info.component.html",
	styleUrls: ["./personal-info.component.scss"],
})
export class PersonalInfoComponent implements OnInit {
	personalInfo: PersonalInfo;

	constructor(private profileService: ProfileService) {
		this.personalInfo = {
			fullName: "",
			username: "",
			email: "",
		};
	}

	ngOnInit(): void {
		this.profileService.getPersonalInfo().subscribe((result) => {
			this.personalInfo.fullName = result.fullName;
			this.personalInfo.username = result.username;
			this.personalInfo.email = result.email;
		});
	}
}
