import { Injectable } from "@angular/core";
import { ClassroomMemberTypes } from "../models/classroom.models";
import { Select } from "@ngxs/store";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";
import { ClassroomApiService } from "../../../common/api/classroom-api.service";
import { Observable } from "rxjs";
import { ClassroomViewDto } from "src/app/common/models/classroom.models";
import { RecruitmentApiService } from "src/app/common/api/recruitment-api.service";

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

	getOwnPostedJobs(): Observable<any> {
		return this.recruitmentApiService.getOwnedJobs(this.memberId);
	}
}
