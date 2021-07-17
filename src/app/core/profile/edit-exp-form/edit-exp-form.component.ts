import { Component, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Builder } from "builder-pattern";
import { Observable, Subscription } from "rxjs";
import { EditExperienceRequest } from "src/app/common/models/profile.models";
import { ProfileService } from "../services/profile.service";

export interface DialogData {
	expId: string;
}

@Component({
	selector: "profile-edit-exp-form",
	templateUrl: "./edit-exp-form.component.html",
	styleUrls: ["./edit-exp-form.component.scss"],
})
export class EditExpFormComponent implements OnInit, OnDestroy {
	editExpForm: FormGroup;

	subscriptions: Subscription[];

	constructor(
		private profileService: ProfileService,
		public dialogRef: MatDialogRef<EditExpFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {
		this.editExpForm = new FormGroup({
			course: new FormControl("", [Validators.required]),
			semester: new FormControl("", [Validators.required]),
			description: new FormControl("", [Validators.required]),
		});
		this.subscriptions = [];
	}

	ngOnInit(): void {
		this.subscriptions.push(
			this.profileService.getExperienceById(this.data.expId).subscribe((result) => {
				this.editExpForm.patchValue({ course: result.course });
				this.editExpForm.patchValue({ semester: result.semester });
				this.editExpForm.patchValue({ description: result.description });
			})
		);
	}
	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}

	display(): void {
		console.log(`before display -> ${this.data.expId}`);
		this.subscriptions.push(
			this.profileService.getExperienceById(this.data.expId).subscribe((result) => {
				this.editExpForm.patchValue({ course: result.course });
				this.editExpForm.patchValue({ semester: result.semester });
				this.editExpForm.patchValue({ description: result.description });
			})
		);
	}

	submit(): void {
		const editForm = Builder(EditExperienceRequest)
			.experienceId(this.data.expId)
			.course(this.editExpForm.value.course)
			.semester(this.editExpForm.value.semester)
			.description(this.editExpForm.value.description)
			.build();
		this.profileService.editExperience(editForm).subscribe(() => {
			this.dialogRef.close();
		});
	}
}
