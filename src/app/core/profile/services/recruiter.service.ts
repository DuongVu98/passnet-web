import { Injectable } from "@angular/core";
import { RecruitmentApiService } from "../../../common/api/recruitment-api.service";
import { JobFormModel } from "../models/job-form.model";

@Injectable({
	providedIn: "root",
})
export class RecruiterService {
	constructor(private recruitmentApiService: RecruitmentApiService) {}

	addNewJob(jobFormModel: JobFormModel): Observable<any> {
		return this.recruitmentApiService.postJob(jobFormModel, "");
	}
}
