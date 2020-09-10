import { Injectable } from "@angular/core";
import { RecruitmentApiService } from "../../../common/api/recruitment-api.service";

@Injectable({
	providedIn: "root",
})
export class RecruitorApiService {
	constructor(private recruitmentApiService: RecruitmentApiService) {}

	testServiceCall(): void {
		this.recruitmentApiService.testEnv();
	}
}
