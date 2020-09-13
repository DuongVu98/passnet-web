import { Injectable } from "@angular/core";
import { RecruitmentApiService } from "../../../common/api/recruitment-api.service";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ApplicatorApiService {
	constructor(private recruitmentApiService: RecruitmentApiService) {}

	getTeacherProfile(teacherId: string): Observable<any> {
		return this.recruitmentApiService.getTeacherProfile(teacherId);
	}

	getJobDetail(jobId: string): Observable<any> {
		return this.recruitmentApiService.getJobDetail(jobId);
	}
}
