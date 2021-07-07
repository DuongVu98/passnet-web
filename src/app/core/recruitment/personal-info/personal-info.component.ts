import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PersonalInfoService } from "../services/personal-info.service";

interface ProfileView {
	fullName: string;
}

@Component({
	selector: "recruitment-personal-info",
	templateUrl: "./personal-info.component.html",
	styleUrls: ["./personal-info.component.scss"],
})
export class PersonalInfoComponent implements OnInit, OnDestroy {
	profileView: ProfileView;

	subcription: Subscription;

	constructor(private personalInfoService: PersonalInfoService) {
		this.profileView = { fullName: "" };
	}

	ngOnInit(): void {
		this.subcription = this.personalInfoService.getPersonalInfo().subscribe((profile) => {
			this.profileView.fullName = profile.fullName;
		});
	}

	ngOnDestroy(): void {
		this.subcription.unsubscribe();
	}
}
