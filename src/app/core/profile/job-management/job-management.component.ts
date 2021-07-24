import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { AddJobFormComponent } from "../add-job-form/add-job-form.component";
import { ProfileState, ProfileTypeSelection } from "../store/profile.state";

@Component({
	selector: "profile-job-management",
	templateUrl: "./job-management.component.html",
	styleUrls: ["./job-management.component.scss"],
})
export class JobManagementComponent implements OnInit {
	profileType: string;

	@Select(ProfileState.getProfileType)
	profileTypeSelection$: Observable<ProfileTypeSelection>;

	constructor(private matDialog: MatDialog) {
		this.profileType = "";
	}

	ngOnInit(): void {
		this.profileTypeSelection$.subscribe((state) => {
			this.profileType = state.profileType;
		});
	}

	openAddJobFormModal(): void {
		const dialogRef = this.matDialog.open(AddJobFormComponent, {
			width: "60%",
		});
	}

	isStudent(): boolean {
		return this.profileType === "STUDENT";
	}
}
