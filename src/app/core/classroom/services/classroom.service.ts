import { Injectable } from "@angular/core";
import { ClassroomMemberTypes } from "../models/classroom.models";
import { Select } from "@ngxs/store";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";
import { ClassroomApiService } from "../../../common/api/classroom-api.service";
import { forkJoin, merge, Observable, of } from "rxjs";
import { ClassroomViewDto, MemberDto } from "src/app/common/models/classroom.models";
import { RecruitmentApiService } from "src/app/common/api/recruitment-api.service";
import { JobViewDto } from "src/app/common/models/recruitment.models";
import { map, mergeMap } from "rxjs/operators";
import { ProfileState, TeacherOrganizationSelection } from "../../profile/store/profile.state";
import { ActiveClassroomSelection, ClassroomState } from "../store/classroom.state";
import { ProfileApiService } from "src/app/common/api/profile-api.service";
import { OrganizerApiService } from "src/app/common/api/organizer-api.service";

@Injectable({
	providedIn: "root",
})
export class ClassroomService {
	@Select(AuthState.getLoggedUser)
	loggedUser$: Observable<LoggedUserStateSelection>;

	@Select(ProfileState.getTeacherOrg)
	organizationSelection$: Observable<TeacherOrganizationSelection>;

	@Select(ClassroomState.getActiveClassroom)
	activeClassroomSelection$: Observable<ActiveClassroomSelection>;

	memberId: string;
	organizationId: string;
	activeClassroomId: string;

	constructor(
		private classroomApiService: ClassroomApiService,
		private recruitmentApiService: RecruitmentApiService,
		private profileApiService: ProfileApiService,
		private organizationApiService: OrganizerApiService
	) {
		this.loggedUser$.subscribe((loggedUser) => {
			this.memberId = loggedUser.user.profileId;
		});
		this.organizationSelection$.subscribe((state) => {
			this.organizationId = state.organization.organizationId;
		});
		this.activeClassroomSelection$.subscribe((state) => {
			this.activeClassroomId = state.classroomId;
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

	getClassroomMembers(): Observable<MemberDto[]> {
		return this.classroomApiService.getClassroomMembers(this.activeClassroomId);
	}

	getMemberName(memberId: string): Observable<{ name: string; studentId: string; email: string }> {
		return this.profileApiService.getProfile(memberId).pipe(
			map((profile) => {
				return forkJoin({
					name: of(profile.fullName),
					studentId: this.getStudentId(profile.uid),
					email: of(profile.email),
				});
			}),
			mergeMap((mem) => merge(mem))
		);
	}

	getStudentId(uid: string): Observable<string> {
		return this.organizationApiService.getStudentByUid(uid).pipe(map((student) => student.cardId));
	}
}
