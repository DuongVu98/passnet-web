import { Injectable } from "@angular/core";
import { RecruitmentApiService } from "../../../common/api/recruitment-api.service";
import { forkJoin, merge, Observable, of } from "rxjs";
import { ApplicationForm } from "../models/recruitment.models";
import { ApplicationFormDto, JobDetailViewDto } from "src/app/common/models/recruitment.models";
import { Select } from "@ngxs/store";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";
import { ProfileState, StudentOrganizationSelection } from "../../profile/store/profile.state";
import { OrganizerApiService } from "src/app/common/api/organizer-api.service";
import { map, mergeMap } from "rxjs/operators";

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

	constructor(
		private recruitmentApiService: RecruitmentApiService,
		private organizationApiService: OrganizerApiService
	) {
		this.loggedUser$.subscribe((loggedUser) => {
			this.profileId = loggedUser.user.profileId;
		});

		this.studentOrgSelection$.subscribe((orgState) => {
			this.orgId = orgState.organization.organizationId;
			this.departmentId = orgState.organization.departmentId;
		});
	}

	getJobDetail(jobId: string): Observable<JobDetailViewDto> {
		return this.recruitmentApiService.getJobDetail(jobId).pipe(
			map((jobView) => {
				return forkJoin({
					jobTitle: of(jobView.jobTitle),
					teacherId: of(jobView.teacherId),
					courseName: of(jobView.courseName),
					content: of(jobView.content),
					requirement: of(jobView.requirement),
					semester: this.getSemester(jobView.semester),
				});
			}),
			mergeMap((jobView) => merge(jobView))
		);
	}

	getSemester(semCode: string): Observable<string> {
		return this.organizationApiService.getSemesterById(semCode).pipe(map((sem) => sem.name));
	}

	sendApplicationForm(applicationForm: ApplicationForm, jobId: string): Observable<any> {
		return this.recruitmentApiService.applyJob(
			new ApplicationFormDto().withLetter(applicationForm.letter).withContent(applicationForm.letter),
			jobId,
			this.profileId
		);
	}
}
