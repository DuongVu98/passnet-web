import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Builder } from "builder-pattern";
import { Observable } from "rxjs";
import { AddExperienceRequest } from "src/app/common/models/profile.models";
import { ProfileService } from "../services/profile.service";

@Component({
	selector: "profile-add-exp-form",
	templateUrl: "./add-exp-form.component.html",
	styleUrls: ["./add-exp-form.component.scss"],
})
export class AddExpFormComponent implements OnInit {
	addExpForm: FormGroup;

	constructor(private profileService: ProfileService) {
		this.addExpForm = new FormGroup({
			course: new FormControl("", [Validators.required]),
			semester: new FormControl("", [Validators.required]),
			description: new FormControl("", [Validators.required]),
		});
	}

	ngOnInit(): void {}

	submit(): Observable<any> {
		const formDto = Builder(AddExperienceRequest)
			.course(this.addExpForm.value.course)
			.semester(this.addExpForm.value.semester)
			.description(this.addExpForm.value.description)
			.build();
		return this.profileService.addExperience(formDto);
	}
}
