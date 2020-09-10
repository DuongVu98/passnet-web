import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BaseCommonModule } from "../../common/base-common.module";
import { RecruitmentPageComponent } from "./recruitment-page/recruitment-page.component";
import { RecruiterApiService } from "./services/recruiter-api.service";
import { ApplicatorApiService } from "./services/applicator-api.service";

@NgModule({
	declarations: [RecruitmentPageComponent],
	imports: [CommonModule, BaseCommonModule],
	exports: [RecruitmentPageComponent],
	providers: [RecruiterApiService, ApplicatorApiService],
})
export class RecruitmentModule {}
