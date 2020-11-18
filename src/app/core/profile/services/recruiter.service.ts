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

	constructor(private recruitmentApiService: RecruitmentApiService) {}

	// Add new job method
	addNewJob(jobFormModel: JobFormModel): void {
		let uid: string;
		this.loggedUser$.subscribe((loggedUser) => {
			uid = loggedUser.user.uid;
		});
		this.recruitmentApiService.postJob(
			new JobFormDto()
				.withTitle(jobFormModel.courseName)
				.withCourseName(jobFormModel.courseName)
                .withContent(jobFormModel.content)
				.withRequirement(jobFormModel.requirement)
				.withSemester(jobFormModel.semester),
			uid
		).subscribe();
	}
}
