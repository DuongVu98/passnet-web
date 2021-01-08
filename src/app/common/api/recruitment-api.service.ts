import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { JobFormDto } from "../models/profile.models";
import { ApplicationFormDto } from "../models/recruitment.models";

@Injectable({
	providedIn: "root",
})
export class RecruitmentApiService {
	private recruitementApiServer = environment.recruitmentApi;

	constructor(private httpClient: HttpClient) {
		this.getAllJobs();
	}

	postJob(jobFormDto: JobFormDto, teacherId: string): Observable<any> {
		return this.httpClient.post<JobFormDto>(
			`${this.recruitementApiServer}/command/recruiter/post-job`,
			jobFormDto,
			{
				params: {
					teacherId,
				},
			}
		);
	}

	getAllJobs(): Observable<any> {
		return this.httpClient.get<any>(`${this.recruitementApiServer}/query/posted-jobs`);
	}

	getJobDetail(jobId: string): Observable<any> {
		return this.httpClient.get<any>(`${this.recruitementApiServer}/query/job-view`, {
			params: {
				jobId,
			},
		});
	}

	applyJob(applicationForm: ApplicationFormDto, jobId: string, studentId: string): Observable<any> {
		return this.httpClient.post<ApplicationFormDto>(`${this.recruitementApiServer}/command/applicator/apply-job`, applicationForm, {
			params: {
				jobId,
				studentId,
			},
		});
	}
}
