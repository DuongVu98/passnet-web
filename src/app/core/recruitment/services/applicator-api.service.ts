import { Injectable } from "@angular/core";
import { RecruitmentApiService } from "../../../common/api/recruitment-api.service";
import { Observable } from "rxjs";
import { ApplicationForm } from "../models/recruitment.models";
import { ApplicationFormDto } from "src/app/common/models/recruitment.models";

@Injectable({
	providedIn: "root",
})
export class ApplicatorService {
	constructor(private recruitmentApiService: RecruitmentApiService) {}

	getTeacherProfile(teacherId: string): Observable<any> {
		return null;
	}

	getJobDetail(jobId: string): Observable<any> {
		return this.recruitmentApiService.getJobDetail(jobId);
	}

	sendApplicationForm(applicationForm: ApplicationForm, jobId: string): Observable<any> {
		return this.recruitmentApiService.applyJob(
			new ApplicationFormDto().withLetter(applicationForm.letter).withContent(applicationForm.letter),
			"",
			jobId
		);
	}
}
