import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

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
}
