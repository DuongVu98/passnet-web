import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { JobFormDto } from "../models/profile.models";
import {
	ApplicationFormDto,
	JobApplicationDetailDto,
	JobApplicationDto,
	JobApplicationListDto,
	JobDetailViewDto,
	JobViewDto,
	JobViewListDto,
} from "../models/recruitment.models";

@Injectable({
	providedIn: "root",
})
export class RecruitmentApiService {
	private recruitmentApiServer = environment.recruitmentApi;

	constructor(private httpClient: HttpClient) {
		this.getAllJobs();
	}

	postJob(jobFormDto: JobFormDto, teacherId: string): Observable<any> {
		console.log(`depbug from before post ${JSON.stringify(jobFormDto)}`);
		console.log(`teacherId --> ${teacherId}`);
		return this.httpClient.post<JobFormDto>(`${this.recruitmentApiServer}/jobs/post-job`, jobFormDto, {
			params: {
				teacherId,
			},
		});
	}

	getAllJobs(): Observable<JobViewDto[]> {
		return this.httpClient.get<any>(`${this.recruitmentApiServer}/query/posted-jobs`);
	}

	getOwnedJobs(userId: string): Observable<JobViewDto[]> {
		return this.httpClient.get<any>(`${this.recruitmentApiServer}/query/owned-jobs`, {
			params: {
				teacherId: userId,
			},
		});
	}

	getJobDetail(jobId: string): Observable<JobDetailViewDto> {
		return this.httpClient.get<JobDetailViewDto>(`${this.recruitmentApiServer}/query/job-view`, {
			params: {
				jobId,
			},
		});
	}

	applyJob(applicationForm: ApplicationFormDto, jobId: string, studentId: string): Observable<any> {
		return this.httpClient.post<ApplicationFormDto>(
			`${this.recruitmentApiServer}/jobs/${jobId}/apply-job`,
			applicationForm,
			{
				params: {
					studentId: studentId,
				},
			}
		);
	}

	getAllJobApplicationList(jobId: string): Observable<JobApplicationListDto> {
		return this.httpClient.get<JobApplicationListDto>(
			`${this.recruitmentApiServer}/query/job-application-list-view`,
			{
				params: {
					jobId: jobId,
				},
			}
		);
	}

	getOwnedApplications(studentId: string): Observable<JobApplicationDetailDto[]> {
		return this.httpClient.get<JobApplicationDetailDto[]>(
			`${this.recruitmentApiServer}/query/applications/by-profile`,
			{
				params: {
					studentId: studentId,
				},
			}
		);
	}

	acceptApplicationForm(applicationId: string, jobId: string): Observable<any> {
		return this.httpClient.put<any>(
			`${this.recruitmentApiServer}/jobs/${jobId}/accept-application`,
			{},
			{
				params: {
					jobApplicationId: applicationId,
				},
			}
		);
	}
}
