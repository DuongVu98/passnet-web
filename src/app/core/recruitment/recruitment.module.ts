import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BaseCommonModule } from "../../common/base-common.module";
import { RecruitmentPageComponent } from "./recruitment-page/recruitment-page.component";
import { RecruiterApiService } from "./services/recruiter-api.service";
import { ApplicatorService } from "./services/applicator-api.service";
import { JobDetailComponent } from "./job-detail/job-detail.component";
import { ApplicationFormComponent } from "./application-form/application-form.component";
import { JobsBrowserComponent } from "./jobs-browser/jobs-browser.component";
import { PersonalInfoComponent } from "./personal-info/personal-info.component";

@NgModule({
	declarations: [
		RecruitmentPageComponent,
		JobDetailComponent,
		ApplicationFormComponent,
		JobsBrowserComponent,
		PersonalInfoComponent,
	],
	imports: [CommonModule, BaseCommonModule],
	exports: [RecruitmentPageComponent, JobDetailComponent],
	providers: [RecruiterApiService, ApplicatorService],
})
export class RecruitmentModule {}
