import { Injectable } from "@angular/core";
import { ClassroomViewDto, PostViewDto } from "src/app/common/models/classroom.models";
import { ClassroomApiService } from "../../../common/api/classroom-api.service";
import { Observable } from "rxjs";
import { Select } from "@ngxs/store";
import { ActiveClassroomSelection, ClassroomState } from "../store/classroom.state";

@Injectable({
	providedIn: "root",
})
export class ClassroomSpaceService {
	@Select(ClassroomState.getActiveClassroom)
	activeClassroom$: Observable<ActiveClassroomSelection>;

	classroomSpaceId: string;

	constructor(private classroomApiService: ClassroomApiService) {
		this.activeClassroom$.subscribe((classroom) => {
			this.classroomSpaceId = classroom.classroomId;
		});
	}

	getClassroomView(): Observable<ClassroomViewDto> {
		return this.classroomApiService.getClassroomById(this.classroomSpaceId);
	}

	getAllPosts(): Observable<PostViewDto[]> {
		return this.classroomApiService.getPostsByClassroom(this.classroomSpaceId);
	}
}
