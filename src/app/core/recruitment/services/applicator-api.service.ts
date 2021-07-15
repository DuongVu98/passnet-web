import { Injectable } from "@angular/core";
import { RecruitmentApiService } from "../../../common/api/recruitment-api.service";
import { Observable } from "rxjs";
import { ApplicationForm } from "../models/recruitment.models";
import { ApplicationFormDto } from "src/app/common/models/recruitment.models";
import { Select } from "@ngxs/store";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";

@Injectable({
	providedIn: "root",
})
export class ApplicatorService {
	@Select(AuthState.getLoggedUser)
	loggedUser$: Observable<LoggedUserStateSelection>;
	profileId;

	constructor(private recruitmentApiService: RecruitmentApiService) {
		this.loggedUser$.subscribe((loggedUser) => {
			this.profileId = loggedUser.user.profileId;
		});
	}

	getTeacherProfile(teacherId: string): Observable<any> {
		return null;
	}

	getJobDetail(jobId: string): Observable<any> {
		return this.recruitmentApiService.getJobDetail(jobId);
	}

	sendApplicationForm(applicationForm: ApplicationForm, jobId: string): Observable<any> {
		return this.recruitmentApiService.applyJob(
			new ApplicationFormDto().withLetter(applicationForm.letter).withContent(applicationForm.letter),
			jobId,
			this.profileId
		);
	}
}
