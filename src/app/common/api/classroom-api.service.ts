import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ClassroomMemberTypes } from "src/app/core/classroom/models/classroom.models";
import { ClassroomViewDto, MemberDto, PostViewDto } from "../../common/models/classroom.models";

const classroomApiHost = environment.classroomApi;

@Injectable({
	providedIn: "root",
})
export class ClassroomApiService {
	constructor(private httpClient: HttpClient) {}

	getClassroomById(id: string): Observable<ClassroomViewDto> {
		console.log(`get classroom by id: ${id}`);
		return this.httpClient.get<ClassroomViewDto>(`${classroomApiHost}/api/query/classrooms/by-id`, {
			params: {
				id,
			},
		});
	}

	getClassroomByJob(jobId: string): Observable<any> {
		return this.httpClient.post<any>(`${classroomApiHost}/api/query/classrooms/by-job`, {
			jobId: jobId,
		});
	}

	getClassroomListByMemberType(uid: string, memberType: ClassroomMemberTypes): Observable<ClassroomViewDto[]> {
		let classroomMemberType;
		if (memberType == ClassroomMemberTypes.STUDENT) {
			classroomMemberType = "STUDENT";
		} else if (memberType == ClassroomMemberTypes.ASSISTANT) {
			classroomMemberType = "ASSISTANT";
		} else if (memberType == ClassroomMemberTypes.LECTURER) {
			classroomMemberType = "LECTURER";
		}
		return this.httpClient.get<ClassroomViewDto[]>(`${classroomApiHost}/api/query/classrooms/by-role`, {
			params: {
				profileId: uid,
				role: memberType.toString(),
			},
		});
	}

	createClassroom(
		profileId: string,
		courseName: string,
		assistants: string[],
		jobId: string,
		organizationId: string
	): Observable<any> {
		return this.httpClient.post<any>(`${classroomApiHost}/api/classrooms/create-classroom`, {
			teacherId: profileId,
			courseName: courseName,
			taIds: assistants,
			jobId: jobId,
			organizationId: organizationId,
		});
	}

	getPostsByClassroom(classroomId: string): Observable<PostViewDto[]> {
		return this.httpClient.get<PostViewDto[]>(`${classroomApiHost}/api/query/classrooms/${classroomId}/posts`);
	}

	getClassroomMembers(classroomId: string): Observable<MemberDto[]> {
		return this.httpClient.get<MemberDto[]>(`${classroomApiHost}/api/query/classrooms/${classroomId}/members`);
	}

	createNewPostToClassroom(content: string, classroomId: string, postOwnerId: string) {
		return this.httpClient.post<any>(`${classroomApiHost}/api/classrooms/${classroomId}/create-post`, {
			content,
			postOwnerId,
		});
	}

	addCommentToPost(ownerId: string, postId: string, content: string, classroomId: string): Observable<any> {
		return this.httpClient.post<any>(`${classroomApiHost}/api/classrooms/${classroomId}/add-comment`, {
			ownerId,
			postId,
			content,
		});
	}

	joinClassroomByCode(classCode: string, profileId: string, orgId: string): Observable<any> {
		return this.httpClient.post<any>(`${classroomApiHost}/api/classrooms/join-class`, {
			classCode,
			profileId,
			orgId,
		});
	}
}
