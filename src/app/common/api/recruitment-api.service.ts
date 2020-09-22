import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { JobFormDto } from "../models/profile.models";
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

	postJob(jobFormDto: JobFormDto, teacherId: string): Observable<any> {
		return this.httpClient.post<JobFormDto>(
			`${this.recruitementApiServer}/recruiter/post-job/${teacherId}`,
			jobFormDto
		);
	}
}
