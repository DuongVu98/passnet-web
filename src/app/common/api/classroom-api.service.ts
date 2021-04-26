import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ClassroomMemberTypes } from "src/app/core/classroom/models/classroom.models";
import { ClassroomViewDto } from "../../common/models/classroom.models";

const classroomApiHost = environment.classroomApi;

@Injectable({
	providedIn: "root",
})
export class ClassroomApiService {
	constructor(private httpClient: HttpClient) {}

	getClassroomFromJob(jobId: string): Observable<any> {
		return this.httpClient.post<any>(`${classroomApiHost}/home/classroom-view/job-id`, {
			jobId: jobId,
		});
	}

	getClassroomListByMemberType(uid: string, memberType: ClassroomMemberTypes): Observable<ClassroomViewDto[]> {
		let classroomMemberType;
		if (memberType == ClassroomMemberTypes.STUDENT) {
			classroomMemberType = "student";
		} else if (memberType == ClassroomMemberTypes.TEACHER_ASSISTANCE) {
			classroomMemberType = "teacherAssistance";
		} else if ((memberType = ClassroomMemberTypes.TEACHER)) {
			classroomMemberType = "teacher";
		}

		return this.httpClient.post<ClassroomViewDto[]>(`${classroomApiHost}/home/classroom-list`, {
			uid: uid,
			memberType: classroomMemberType,
		});
	}

	createClassroom(uid: string, courseName: string, taIds: string[], jobId: string): Observable<any> {
		console.log(`about to create classroom - teacher: ${uid} + jobId: ${jobId}`);

		return this.httpClient.post<any>(`${classroomApiHost}/home/create-classroom`, {
			teacherId: uid,
			courseName: courseName,
			taIds: taIds,
			jobId: jobId,
		});
	}
}
