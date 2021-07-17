import { Injectable } from "@angular/core";
import { RecruitmentApiService } from "../../../common/api/recruitment-api.service";
import { Observable } from "rxjs";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";
import { Select } from "@ngxs/store";
import { JobViewDto } from "src/app/common/models/recruitment.models";
import { JobFormDto } from "src/app/common/models/profile.models";

@Injectable({
	providedIn: "root",
})
export class RecruiterApiService {
	@Select(AuthState.getLoggedUser)
	loggedUser$: Observable<LoggedUserStateSelection>;

	profileId: string;

	constructor(private recruitmentApiService: RecruitmentApiService) {
		this.loggedUser$.subscribe((state) => {
			this.profileId = state.user.profileId;
		});
	}

	getAllRecruiterPostedJobs(): Observable<any> {
		return this.recruitmentApiService.getAllJobs();
	}
	getOwnedPostedJobs(): Observable<JobViewDto[]> {
		return this.recruitmentApiService.getOwnedJobs(this.profileId);
	}

	addNewJob(jobFormDto: JobFormDto): Observable<any> {
		return this.recruitmentApiService.postJob(jobFormDto, this.profileId);
	}
}
