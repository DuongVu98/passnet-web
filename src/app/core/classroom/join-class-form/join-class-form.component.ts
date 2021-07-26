import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ClassroomService } from "../services/classroom.service";

interface JoinClassroomForm {
	studentId: string;
}

@Component({
	selector: "classroom-join-class-form",
	templateUrl: "./join-class-form.component.html",
	styleUrls: ["./join-class-form.component.scss"],
})
export class JoinClassFormComponent implements OnInit {
	progressing: boolean;
	inputCode: string;

	constructor(
		public dialogRef: MatDialogRef<JoinClassFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: JoinClassroomForm,
		private classroomService: ClassroomService
	) {
		this.progressing = false;
		this.inputCode = "";
	}

	ngOnInit(): void {}

	joinClass(): void {
		this.progressing = true;
		this.classroomService
			.joinClassroom(this.inputCode)
			.pipe(catchError((err) => this.handleError(err, this.dialogRef)))
			.subscribe(() => {
				this.progressing = false;
				this.dialogRef.close();
			});
	}

	private handleError(error: HttpErrorResponse, dialogRef: MatDialogRef<JoinClassFormComponent>) {
		dialogRef.close();
		if (error.status === 0) {
			console.error("An error occurred:", error.error);
		} else {
			console.error(`Backend returned code ${error.status}, body was: `, error.error);
		}
		return throwError("Something bad happened; please try again later.");
	}
}
