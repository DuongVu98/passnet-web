import { Injectable } from "@angular/core";
import { RecruitmentApiService } from "../../../common/api/recruitment-api.service";
import { Observable } from "rxjs";
import { ApplicationForm } from "../models/recruitment.models";
import { ApplicationFormDto, JobDetailViewDto } from "src/app/common/models/recruitment.models";
import { Select } from "@ngxs/store";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";
import { ProfileState, StudentOrganizationSelection } from "../../profile/store/profile.state";

@Injectable({
	providedIn: "root",
})
export class ApplicatorService {
	profileId: string;
	orgId: string;
	departmentId: string;

	@Select(AuthState.getLoggedUser)
	loggedUser$: Observable<LoggedUserStateSelection>;

	@Select(ProfileState.getStudentOrg)
	studentOrgSelection$: Observable<StudentOrganizationSelection>;

	constructor(private recruitmentApiService: RecruitmentApiService) {
		this.loggedUser$.subscribe((loggedUser) => {
			this.profileId = loggedUser.user.profileId;
		});

		this.studentOrgSelection$.subscribe((orgState) => {
			this.orgId = orgState.organization.organizationId;
			this.departmentId = orgState.organization.departmentId;
		});
	}

	getJobDetail(jobId: string): Observable<JobDetailViewDto> {
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
