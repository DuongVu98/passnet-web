import { Injectable } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { OrganizerApiService } from "src/app/common/api/organizer-api.service";
import { ProfileApiService } from "src/app/common/api/profile-api.service";
import { RecruitmentApiService } from "src/app/common/api/recruitment-api.service";
import { OrgMemberDto } from "src/app/common/models/auth.models";
import {
	AddExperienceRequest,
	EditExperienceRequest,
	ExperienceDto,
	ProfileDto,
	UpdateBasicInfoRequest,
} from "src/app/common/models/profile.models";
import {
	JobApplicationDetailDto,
	JobApplicationDto,
	JobApplicationListDto,
	SemesterDto,
} from "src/app/common/models/recruitment.models";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";
import { ProfileState, TeacherOrganizationSelection } from "../store/profile.state";

@Injectable({
	providedIn: "root",
})
export class ProfileService {
	@Select(AuthState.getLoggedUser)
	loggedUser$: Observable<LoggedUserStateSelection>;
	@Select(ProfileState.getTeacherOrg)
	teacherOrgSeletection$: Observable<TeacherOrganizationSelection>;

	profileId: string;
	userId: string;
	organizationId: string;

	constructor(
		private profileApiService: ProfileApiService,
		private organizerApiService: OrganizerApiService,
		private recruitmentApiService: RecruitmentApiService
	) {
		this.loggedUser$.subscribe((loggedUser) => {
			this.profileId = loggedUser.user.profileId;
			this.userId = loggedUser.user.uid;
		});
		this.teacherOrgSeletection$.subscribe((state) => {
			this.organizationId = state.organization.organizationId;
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

	getSemesters(): Observable<SemesterDto[]> {
		return this.organizerApiService.getSemestersByOrg(this.organizationId);
	}

	getSemesterById(semId: string): Observable<string> {
		return this.organizerApiService.getSemesterById(semId).pipe(map((sem) => sem.name));
	}

	getOwnedApplications(): Observable<JobApplicationDetailDto[]> {
		return this.recruitmentApiService.getOwnedApplications(this.profileId);
	}
}
