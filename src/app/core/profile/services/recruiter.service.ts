import { Injectable } from "@angular/core";
import { RecruitmentApiService } from "../../../common/api/recruitment-api.service";
import { JobFormModel } from "../models/job-form.model";
import { Select } from "@ngxs/store";
import { AuthState } from "../../auth/store/auth.state";
import { Observable } from "rxjs";
import { JobFormDto } from "src/app/common/models/profile.models";

@Injectable({
	providedIn: "root",
})
export class RecruiterService {
	@Select(AuthState.getLoggedUser) loggedUser$: Observable<any>;

	constructor(private recruitmentApiService: RecruitmentApiService) {}

	async addNewJob(jobFormModel: JobFormModel): Promise<Observable<any>> {
		let id: string;
		await this.loggedUser$.subscribe((user) => {
			id = user.uid;
		});
		return this.recruitmentApiService.postJob(
			new JobFormDto()
				.setTitle(jobFormModel.courseName)
				.setDepartment(jobFormModel.department)
				.setDescription(jobFormModel.jobDescription),
			id
		);
	}
}
