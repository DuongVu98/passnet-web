import { Injectable } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { OrganizerApiService } from "src/app/common/api/organizer-api.service";
import { ProfileApiService } from "src/app/common/api/profile-api.service";
import { OrgMemberDto } from "src/app/common/models/auth.models";
import {
	AddExperienceRequest,
	EditExperienceRequest,
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
	userId: string;

	constructor(private profileApiService: ProfileApiService, private organizerApiService: OrganizerApiService) {
		this.loggedUser$.subscribe((loggedUser) => {
			this.profileId = loggedUser.user.profileId;
			this.userId = loggedUser.user.uid;
		});
	}

	getPersonalInfo(): Observable<ProfileDto> {
		return this.profileApiService.getProfile(this.profileId);
	}

	getPersonalInfoById(profileId: string): Observable<ProfileDto> {
		return this.profileApiService.getProfile(profileId);
	}

	getOrgInfo(): Observable<OrgMemberDto> {
		return this.organizerApiService.getStudentByUid(this.userId);
	}

	getExperiencesByProfile(): Observable<ExperienceDto[]> {
		return this.profileApiService.getExperienceByProfile(this.profileId);
	}

	getExperienceById(expId: string): Observable<ExperienceDto> {
		return this.profileApiService.getExperienceById(expId, this.profileId);
	}

	updateBasicInfo(updateRequest: UpdateBasicInfoRequest): void {
		this.profileApiService.updateProfileBasicInfo(updateRequest, this.profileId).subscribe();
	}

	addExperience(addExperienceForm: AddExperienceRequest): Observable<any> {
		return this.profileApiService.addExperience(addExperienceForm, this.profileId);
	}

	editExperience(editExpForm: EditExperienceRequest): Observable<any> {
		return this.profileApiService.editExperience(editExpForm, this.profileId);
	}
}
