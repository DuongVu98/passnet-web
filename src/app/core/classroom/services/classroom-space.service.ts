import { Injectable } from "@angular/core";
import { ClassroomViewDto, MemberDto, PostViewDto } from "src/app/common/models/classroom.models";
import { ClassroomApiService } from "../../../common/api/classroom-api.service";
import { forkJoin, merge, Observable, of } from "rxjs";
import { Select } from "@ngxs/store";
import { ActiveClassroomSelection, ClassroomState } from "../store/classroom.state";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";
import { ProfileApiService } from "src/app/common/api/profile-api.service";
import { map, mergeMap } from "rxjs/operators";
import { OrganizerApiService } from "../../../common/api/organizer-api.service";

@Injectable({
	providedIn: "root",
})
export class ClassroomSpaceService {
	@Select(AuthState.getLoggedUser)
	loggedUser$: Observable<LoggedUserStateSelection>;

	@Select(ClassroomState.getActiveClassroom)
	activeClassroom$: Observable<ActiveClassroomSelection>;

	@Select(ClassroomState.getActiveClassroom)
	activeClassroomSelection$: Observable<ActiveClassroomSelection>;

	classroomSpaceId: string;
	memberId: string;
	activeClassroomId: string;

	constructor(
		private classroomApiService: ClassroomApiService,
		private profileApiService: ProfileApiService,
		private organizationApiService: OrganizerApiService
	) {
		this.activeClassroom$.subscribe((classroom) => {
			this.classroomSpaceId = classroom.classroomId;
		});
		this.loggedUser$.subscribe((loggedUser) => {
			this.memberId = loggedUser.user.profileId;
		});
		this.activeClassroomSelection$.subscribe((state) => {
			this.activeClassroomId = state.classroomId;
		});
	}

	getClassroomView(): Observable<ClassroomViewDto> {
		return this.classroomApiService.getClassroomById(this.classroomSpaceId);
	}

	getAllPosts(): Observable<PostViewDto[]> {
		return this.classroomApiService.getPostsByClassroom(this.classroomSpaceId);
	}

	createNewPost(postContent: string): Observable<any> {
		return this.classroomApiService.createNewPostToClassroom(postContent, this.classroomSpaceId, this.memberId);
	}

	addCommentToPost(postId: string, commentContent: string): Observable<any> {
		console.log(`post: ${postId}\n${commentContent}`);

		return this.classroomApiService.addCommentToPost(this.memberId, postId, commentContent, this.classroomSpaceId);
	}

	getOwnerProfile(profileId: string): Observable<{ name: string; role: string }> {
		return this.profileApiService.getProfile(profileId).pipe(
			map((dto) => {
				return {
					name: dto.fullName,
					role: dto.teacher != null ? "Lecturer" : "",
				};
			})
		);
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
