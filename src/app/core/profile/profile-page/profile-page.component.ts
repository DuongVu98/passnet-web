import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";
import { AddJobFormComponent } from "../add-job-form/add-job-form.component";

@Component({
	selector: "profile-profile-page",
	templateUrl: "./profile-page.component.html",
	styleUrls: ["./profile-page.component.scss"],
})
export class ProfilePageComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
