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
	private recruitmentApiServer = environment.recruitmentApi;

	constructor(private httpClient: HttpClient) {
		this.getAllJobs();
	}

	postJob(jobFormDto: JobFormDto, teacherId: string): Observable<any> {
		return this.httpClient.post<JobFormDto>(`${this.recruitmentApiServer}/command/recruiter/post-job`, jobFormDto, {
			params: {
				teacherId,
			},
		});
	}

	getAllJobs(): Observable<any> {
		return this.httpClient.get<any>(`${this.recruitmentApiServer}/query/posted-jobs`);
	}

	getOwnedJobs(userId: string): Observable<any> {
		return this.httpClient.get<any>(`${this.recruitmentApiServer}/query/owned-jobs`, {
			params: {
				teacherId: userId,
			},
		});
	}

	getJobDetail(jobId: string): Observable<any> {
		return this.httpClient.get<any>(`${this.recruitmentApiServer}/query/job-view`, {
			params: {
				jobId,
			},
		});
	}

	applyJob(applicationForm: ApplicationFormDto, jobId: string, studentId: string): Observable<any> {
		return this.httpClient.post<ApplicationFormDto>(
			`${this.recruitmentApiServer}/command/applicator/apply-job`,
			applicationForm,
			{
				params: {
					jobId,
					studentId,
				},
			}
		);
	}

	getAllJobApplicationList(jobId: string): Observable<any> {
		return this.httpClient.get<any>(`${this.recruitmentApiServer}/query/job-application-list-view`, {
			params: {
				jobId: jobId,
			},
		});
	}
}
