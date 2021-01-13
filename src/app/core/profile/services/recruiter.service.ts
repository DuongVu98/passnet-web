import { Injectable } from "@angular/core";
import { RecruitmentApiService } from "../../../common/api/recruitment-api.service";
import { JobFormModel } from "../models/job-form.model";
import { Select } from "@ngxs/store";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";
import { Observable } from "rxjs";
import { JobFormDto } from "src/app/common/models/profile.models";

@Injectable({
	providedIn: "root",
})
export class RecruiterService {
	@Select(AuthState.getLoggedUser)
	loggedUser$: Observable<LoggedUserStateSelection>;

	recruiterId: string;

	constructor(private recruitmentApiService: RecruitmentApiService) {
		this.loggedUser$.subscribe((loggedUser) => {
			this.recruiterId = loggedUser.user.uid;
		});
	}

	// Add new job method
	addNewJob(jobFormModel: JobFormModel): void {
		this.recruitmentApiService
			.postJob(
				new JobFormDto()
					.withTitle(jobFormModel.courseName)
					.withCourseName(jobFormModel.courseName)
					.withContent(jobFormModel.content)
					.withRequirement(jobFormModel.requirement)
					.withSemester(jobFormModel.semester),
				this.recruiterId
			)
			.subscribe();
	}

	getOwnPostedJobs(): Observable<any> {
		return this.recruitmentApiService.getOwnedJobs(this.recruiterId);
	}

	// todo: get job application list from specific job
	getJobApplicationList(jobId: string): Observable<any> {
		return this.recruitmentApiService.getAllJobApplicationList(jobId);
	}
}
