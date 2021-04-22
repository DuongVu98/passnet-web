import { Injectable } from "@angular/core";
import { ClassroomMemberTypes } from "../models/classroom.models";
import { Select } from "@ngxs/store";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";
import { ClassroomApiService } from "../../../common/api/classroom-api.service";
import { Observable, of } from "rxjs";
import { ClassroomViewDto } from "src/app/common/models/classroom.models";
import { RecruitmentApiService } from "src/app/common/api/recruitment-api.service";
import { JobViewDto } from "src/app/common/models/recruitment.models";
import { map, mergeMap } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class ClassroomService {
	@Select(AuthState.getLoggedUser)
	loggedUser$: Observable<LoggedUserStateSelection>;

	memberId: string;

	constructor(
		private classroomApiService: ClassroomApiService,
		private recruitmentApiService: RecruitmentApiService
	) {
		this.loggedUser$.subscribe((loggedUser) => {
			this.memberId = loggedUser.user.uid;
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
				map((list) => list.jobApplicationViewList),
				map((viewList) => viewList.map((dto) => dto.studentId))
			);
		}
	}
}
