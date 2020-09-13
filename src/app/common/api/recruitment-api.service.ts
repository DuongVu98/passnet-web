import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class RecruitmentApiService {
	private recruitementApiServer = environment.recruitmentApi;

	constructor(private httpClient: HttpClient) {}

	getRecruitorPostedJob(): Observable<any> {
		return this.httpClient.get<any>(`${this.recruitementApiServer}/recruiter/posted-jobs`);
	}

	getTeacherProfile(teacherId: string): Observable<any> {
		return this.httpClient.get<any>(`${this.recruitementApiServer}/applicator/teacher-profile/${teacherId}`);
	}

	getJobDetail(jobId: string): Observable<any> {
		return this.httpClient.get<any>(`${this.recruitementApiServer}/applicator/job/${jobId}`);
	}
}
