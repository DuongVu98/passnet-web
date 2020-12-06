import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BaseCommonModule } from "../../common/base-common.module";
import { RecruitmentPageComponent } from "./recruitment-page/recruitment-page.component";
import { RecruiterApiService } from "./services/recruiter-api.service";
import { ApplicatorApiService } from "./services/applicator-api.service";
import { JobDetailComponent } from "./job-detail/job-detail.component";

@NgModule({
	declarations: [RecruitmentPageComponent, JobDetailComponent],
	imports: [CommonModule, BaseCommonModule],
	exports: [RecruitmentPageComponent, JobDetailComponent],
	providers: [RecruiterApiService, ApplicatorApiService],
})
export class RecruitmentModule {}
