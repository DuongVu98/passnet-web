import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddJobFormComponent } from "../add-job-form/add-job-form.component";

@Component({
	selector: "profile-job-management",
	templateUrl: "./job-management.component.html",
	styleUrls: ["./job-management.component.scss"],
})
export class JobManagementComponent implements OnInit {
	constructor(private matDialog: MatDialog) {}

	ngOnInit(): void {}

	openAddJobFormModal(): void {
		const dialogRef = this.matDialog.open(AddJobFormComponent, {
			width: "60%",
		});
	}
}
