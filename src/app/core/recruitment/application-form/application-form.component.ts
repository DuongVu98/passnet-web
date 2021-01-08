import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ApplicationForm } from "../models/recruitment.models";

@Component({
	selector: "recruitment-application-form",
	templateUrl: "./application-form.component.html",
	styleUrls: ["./application-form.component.scss"],
})
export class ApplicationFormComponent implements OnInit {
	@Input() jobId: string;
	@Output() applicationFormEvent: EventEmitter<ApplicationForm> = new EventEmitter<ApplicationForm>();

	applicationFormGroup: FormGroup = new FormGroup({
		fullName: new FormControl(""),
		gpa: new FormControl(""),
		major: new FormControl(""),
		letter: new FormControl(""),
	});

	constructor() {}

	ngOnInit(): void {}

	send(): void {
		const applicationForm: ApplicationForm = {
			fullName: this.applicationFormGroup.value.fullName,
			gpa: this.applicationFormGroup.value.gpa,
			major: this.applicationFormGroup.value.major,
			letter: this.applicationFormGroup.value.letter,
		};

		this.applicationFormEvent.emit(applicationForm);
	}
}
