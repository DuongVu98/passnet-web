import { Injectable } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";
import { ProfileApiService } from "../../../common/api/profile-api.service";
import { ProfileDto } from "../../../common/models/profile.models";
import { OrganizerApiService } from "src/app/common/api/organizer-api.service";
import { OrgMemberDto } from "src/app/common/models/auth.models";

@Injectable({
	providedIn: "root",
})
export class PersonalInfoService {
	@Select(AuthState.getLoggedUser)
	loggedUser$: Observable<LoggedUserStateSelection>;

	profileId: string;
	userId: string;

	constructor(private profileApiService: ProfileApiService, private organizationApiService: OrganizerApiService) {
		this.loggedUser$.subscribe((loggedUser) => {
			this.profileId = loggedUser.user.profileId;
			this.userId = loggedUser.user.uid;
		});
	}

	getPersonalInfo(): Observable<ProfileDto> {
		return this.profileApiService.getProfile(this.profileId);
	}

	getOrgProfile(): Observable<OrgMemberDto> {
		return this.organizationApiService.getStudentByUid(this.userId);
	}

	getPersonalInfoById(profileId: string): Observable<ProfileDto> {
		return this.profileApiService.getProfile(profileId);
	}
}
