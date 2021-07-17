import { Injectable } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { ProfileApiService } from "src/app/common/api/profile-api.service";
import {
	AddExperienceRequest,
	ExperienceDto,
	ProfileDto,
	UpdateBasicInfoRequest,
} from "src/app/common/models/profile.models";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";

@Injectable({
	providedIn: "root",
})
export class ProfileService {
	@Select(AuthState.getLoggedUser)
	loggedUser$: Observable<LoggedUserStateSelection>;

	profileId: string;

	constructor(private profileApiService: ProfileApiService) {
		this.loggedUser$.subscribe((loggedUser) => {
			this.profileId = loggedUser.user.profileId;
		});
	}

	getPersonalInfo(): Observable<ProfileDto> {
		return this.profileApiService.getProfile(this.profileId);
	}

	getPersonalInfoById(profileId: string): Observable<ProfileDto> {
		return this.profileApiService.getProfile(profileId);
	}

	getExperiencesByProfile(): Observable<ExperienceDto[]> {
		return this.profileApiService.getExperienceByProfile(this.profileId);
	}

	updateBasicInfo(updateRequest: UpdateBasicInfoRequest): void {
		this.profileApiService.updateProfileBasicInfo(updateRequest, this.profileId).subscribe();
	}

	addExperience(addExperienceForm: AddExperienceRequest): Observable<any> {
		return this.profileApiService.addExperience(addExperienceForm, this.profileId);
	}
}
