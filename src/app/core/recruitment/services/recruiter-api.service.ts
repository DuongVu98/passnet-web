import { Injectable } from "@angular/core";
import { RecruitmentApiService } from "../../../common/api/recruitment-api.service";
import { Observable } from "rxjs";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";
import { Select } from "@ngxs/store";
import { JobViewDto, SemesterDto } from "src/app/common/models/recruitment.models";
import { JobFormDto, ProfileDto } from "src/app/common/models/profile.models";
import { OrganizerApiService } from "src/app/common/api/organizer-api.service";
import { map } from "rxjs/operators";
import { ProfileApiService } from "src/app/common/api/profile-api.service";

@Injectable({
	providedIn: "root",
})
export class RecruiterApiService {
	@Select(AuthState.getLoggedUser)
	loggedUser$: Observable<LoggedUserStateSelection>;

	profileId: string;

	constructor(
		private recruitmentApiService: RecruitmentApiService,
		private organizerApiService: OrganizerApiService,
		private profileApiService: ProfileApiService
	) {
		this.loggedUser$.subscribe((state) => {
			this.profileId = state.user.profileId;
		});
	}

	getAllRecruiterPostedJobs(): Observable<JobViewDto[]> {
		return this.recruitmentApiService.getAllJobs();
	}
	getOwnedPostedJobs(): Observable<JobViewDto[]> {
		return this.recruitmentApiService.getOwnedJobs(this.profileId);
	}

	addNewJob(jobFormDto: JobFormDto): Observable<any> {
		return this.recruitmentApiService.postJob(jobFormDto, this.profileId);
	}
	getSemester(semId: string): Observable<SemesterDto> {
		return this.organizerApiService.getSemesterById(semId);
	}

	getProfileView(profileId: string): Observable<ProfileDto> {
		return this.profileApiService.getProfile(profileId);
	}
}
