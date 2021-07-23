import { Injectable } from "@angular/core";
import { RecruitmentApiService } from "../../../common/api/recruitment-api.service";
import { Select } from "@ngxs/store";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";
import { Observable } from "rxjs";
import { JobFormDto } from "src/app/common/models/profile.models";
import { ClassroomApiService } from "src/app/common/api/classroom-api.service";
import { JobApplicationListDto, SemesterDto } from "src/app/common/models/recruitment.models";
import { ProfileState, TeacherOrganizationSelection } from "../store/profile.state";
import { OrganizerApiService } from "src/app/common/api/organizer-api.service";

@Injectable({
	providedIn: "root",
})
export class RecruiterService {
	@Select(AuthState.getLoggedUser)
	loggedUser$: Observable<LoggedUserStateSelection>;

	@Select(ProfileState.getTeacherOrg)
	teacherOrgSeletection$: Observable<TeacherOrganizationSelection>;

	recruiterId: string;
	organizationId: string;

	constructor(
		private recruitmentApiService: RecruitmentApiService,
		private classroomApiService: ClassroomApiService,
		private organizerApiService: OrganizerApiService
	) {
		this.loggedUser$.subscribe((loggedUser) => {
			this.recruiterId = loggedUser.user.profileId;
		});
		this.teacherOrgSeletection$.subscribe((state) => {
			this.organizationId = state.organization.organizationId;
		});
	}

	addNewJob(jobFormDto: JobFormDto): Observable<any> {
		jobFormDto.organizationId = this.organizationId;
		return this.recruitmentApiService.postJob(jobFormDto, this.recruiterId);
	}

	getOwnPostedJobs(): Observable<any> {
		return this.recruitmentApiService.getOwnedJobs(this.recruiterId);
	}

	getJobApplicationList(jobId: string): Observable<JobApplicationListDto> {
		return this.recruitmentApiService.getAllJobApplicationList(jobId);
	}

	acceptApplicationForm(applicationId: string, jobId: string): Observable<any> {
		return this.recruitmentApiService.acceptApplicationForm(applicationId, jobId);
	}

	getClassroomFromJob(jobId: string): Observable<any> {
		return this.classroomApiService.getClassroomByJob(jobId);
	}

	getSemesters(): Observable<SemesterDto[]> {
		return this.organizerApiService.getSemestersByOrg(this.organizationId);
	}
}
