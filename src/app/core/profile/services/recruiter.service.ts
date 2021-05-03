import { Injectable } from "@angular/core";
import { RecruitmentApiService } from "../../../common/api/recruitment-api.service";
import { Select } from "@ngxs/store";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";
import { Observable } from "rxjs";
import { JobFormDto } from "src/app/common/models/profile.models";
import { ClassroomApiService } from "src/app/common/api/classroom-api.service";

@Injectable({
	providedIn: "root",
})
export class RecruiterService {
	@Select(AuthState.getLoggedUser)
	loggedUser$: Observable<LoggedUserStateSelection>;

	recruiterId: string;

	constructor(
		private recruitmentApiService: RecruitmentApiService,
		private classroomApiService: ClassroomApiService
	) {
		this.loggedUser$.subscribe((loggedUser) => {
			this.recruiterId = loggedUser.user.uid;
		});
	}

	addNewJob(jobFormDto: JobFormDto): Observable<any> {
		return this.recruitmentApiService.postJob(jobFormDto, this.recruiterId);
	}

	getOwnPostedJobs(): Observable<any> {
		return this.recruitmentApiService.getOwnedJobs(this.recruiterId);
	}

	getJobApplicationList(jobId: string): Observable<any> {
		return this.recruitmentApiService.getAllJobApplicationList(jobId);
	}

	acceptApplicationForm(applicationId: string, jobId: string): Observable<any> {
		return this.recruitmentApiService.acceptApplicationForm(applicationId, jobId);
	}

	getClassroomFromJob(jobId: string): Observable<any> {
		return this.classroomApiService.getClassroomByJob(jobId);
	}
}
