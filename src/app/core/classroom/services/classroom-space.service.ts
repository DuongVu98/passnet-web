import { Injectable } from "@angular/core";
import { ClassroomViewDto, PostViewDto } from "src/app/common/models/classroom.models";
import { ClassroomApiService } from "../../../common/api/classroom-api.service";
import { Observable } from "rxjs";
import { Select } from "@ngxs/store";
import { ActiveClassroomSelection, ClassroomState } from "../store/classroom.state";
import { AuthState, LoggedUserStateSelection } from "../../auth/store/auth.state";

@Injectable({
	providedIn: "root",
})
export class ClassroomSpaceService {
	@Select(AuthState.getLoggedUser)
	loggedUser$: Observable<LoggedUserStateSelection>;

	@Select(ClassroomState.getActiveClassroom)
	activeClassroom$: Observable<ActiveClassroomSelection>;

	classroomSpaceId: string;
	memberId: string;

	constructor(private classroomApiService: ClassroomApiService) {
		this.activeClassroom$.subscribe((classroom) => {
			this.classroomSpaceId = classroom.classroomId;
		});
		this.loggedUser$.subscribe((loggedUser) => {
			this.memberId = loggedUser.user.uid;
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
}
