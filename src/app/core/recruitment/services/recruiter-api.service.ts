import { Injectable } from "@angular/core";
import { RecruitmentApiService } from "../../../common/api/recruitment-api.service";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class RecruiterApiService {
	constructor(private recruitmentApiService: RecruitmentApiService) {}

	getAllRecruiterPostedJobs(): Observable<any> {
        return null;
	}
	getTeacherProfile(teacherId: string): Observable<any> {
        return null;
	}
}
