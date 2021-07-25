import { Injectable } from "@angular/core";
import { ClassroomMemberTypes } from "../models/classroom.models";
import { Select } from "@ngxs/store";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";
import { ClassroomApiService } from "../../../common/api/classroom-api.service";
import { Observable, of } from "rxjs";
import { ClassroomViewDto } from "src/app/common/models/classroom.models";
import { RecruitmentApiService } from "src/app/common/api/recruitment-api.service";
import { JobViewDto } from "src/app/common/models/recruitment.models";
import { map } from "rxjs/operators";
import { ProfileState, TeacherOrganizationSelection } from "../../profile/store/profile.state";

@Injectable({
	providedIn: "root",
})
export class ClassroomService {
	@Select(AuthState.getLoggedUser)
	loggedUser$: Observable<LoggedUserStateSelection>;

	@Select(ProfileState.getTeacherOrg)
	organizationSelection$: Observable<TeacherOrganizationSelection>;

	memberId: string;
	organizationId: string;

	constructor(
		private classroomApiService: ClassroomApiService,
		private recruitmentApiService: RecruitmentApiService
	) {
		this.loggedUser$.subscribe((loggedUser) => {
			this.memberId = loggedUser.user.profileId;
		});
		this.organizationSelection$.subscribe((state) => {
			this.organizationId = state.organization.organizationId;
		});
	}

	getClassroomList(memberType: ClassroomMemberTypes): Observable<ClassroomViewDto[]> {
		return this.classroomApiService.getClassroomListByMemberType(this.memberId, memberType);
	}

	getOwnPostedJobs(): Observable<JobViewDto[]> {
		return this.recruitmentApiService.getOwnedJobs(this.memberId);
	}

	getAcceptedTasFromJob(jobId: string): Observable<string[]> {
		if (jobId === "") {
			return of([]);
		} else {
			return this.recruitmentApiService.getAllJobApplicationList(jobId).pipe(
				map((list) => list.applications),
				map((viewList) => viewList.filter((dto) => dto.state === "ACCEPTED").map((dto) => dto.studentId))
			);
		}
	}

	createClassroom(courseName: string, taIds: string[], jobId: string) {
		this.classroomApiService
			.createClassroom(this.memberId, courseName, taIds, jobId, this.organizationId)
			.subscribe();
	}

	joinClassroom(code: string): Observable<any> {
		return this.classroomApiService.joinClassroomByCode(code, this.memberId, this.organizationId);
	}
}
