import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";
import { ApplicatorService } from "../../recruitment/services/applicator-api.service";
import { RecruiterApiService } from "../../recruitment/services/recruiter-api.service";
import { AddJobFormComponent } from "../add-job-form/add-job-form.component";

@Component({
	selector: "profile-profile-page",
	templateUrl: "./profile-page.component.html",
	styleUrls: ["./profile-page.component.scss"],
})
export class ProfilePageComponent implements OnInit {
	@Select(AuthState.getLoggedUser) loggedUser$: Observable<LoggedUserStateSelection>;

	userProfile;

	constructor(
		private recruiterApiService: RecruiterApiService,
		private applicatorApiService: ApplicatorService,
		private matDialog: MatDialog
	) {}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData(): void {
		this.loggedUser$.subscribe((loggedUser) => {
			this.userProfile = loggedUser.user;
		});
	}

	openAddJobFormModal(): void {
		this.matDialog.open(AddJobFormComponent);
	}
}
