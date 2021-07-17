import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Select } from "@ngxs/store";
import { Builder } from "builder-pattern";
import { Observable } from "rxjs";
import { UpdateBasicInfoRequest } from "src/app/common/models/profile.models";
import { ProfileService } from "../services/profile.service";
import { ProfileSelection, ProfileState } from "../store/profile.state";

@Component({
	selector: "profile-basic-edit",
	templateUrl: "./basic-edit.component.html",
	styleUrls: ["./basic-edit.component.scss"],
})
export class BasicEditComponent implements OnInit {
	@Select(ProfileState.getProfile)
	profile$: Observable<ProfileSelection>;

	profileType: string;
	profileEditForm: FormGroup;

	constructor(private profileService: ProfileService) {
		this.profileType = "";
		this.profileEditForm = new FormGroup({
			fullName: new FormControl("", [Validators.required, Validators.min(1), Validators.max(20)]),
			overview: new FormControl("", [Validators.required, Validators.min(0), Validators.max(200)]),
			email: new FormControl("", [Validators.required, Validators.min(1), Validators.max(20)]),
			phoneNumber: new FormControl("", [Validators.required, Validators.min(0), Validators.max(20)]),
			cardId: new FormControl("", [Validators.required, Validators.min(0), Validators.max(20)]),
		});
	}

	ngOnInit(): void {
		this.profile$.subscribe((state) => {
			this.profileType = state.profile.type;
			this.profileEditForm.patchValue({ fullName: state.profile.fullName });
			this.profileEditForm.patchValue({ email: state.profile.email });
			this.profileEditForm.patchValue({ overview: state.profile.overview });
			this.profileEditForm.patchValue({ phoneNumber: state.profile.phoneNumber });
			if (state.profile.type === "STUDENT") {
				this.profileEditForm.patchValue({ cardId: state.profile.cardId });
			}
		});
	}

	submitUpdate() {
		const builder = Builder(UpdateBasicInfoRequest)
			.email(this.profileEditForm.value.email)
			.fullName(this.profileEditForm.value.fullName)
			.overview(this.profileEditForm.value.overview)
			.phoneNumber(this.profileEditForm.value.phoneNumber);
		const form =
			this.profileType === "STUDENT"
				? builder.cardId(this.profileEditForm.value.cardId).build()
				: builder.build();
		this.profileService.updateBasicInfo(form);
	}

	isStudent(): boolean {
		return this.profileType === "STUDENT" ? true : false;
	}
}
