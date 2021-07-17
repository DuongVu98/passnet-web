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
import { RouterModule } from "@angular/router";
import { recruitmentRoutes } from "./recruitment.routes";
import { OwnedJobsComponent } from "./owned-jobs/owned-jobs.component";
import { NgxsModule } from "@ngxs/store";
import { RecruitmentState } from "./store/recruitment.state";
import { JobApplicationListComponent } from "./job-application-list/job-application-list.component";

@NgModule({
	declarations: [
		RecruitmentPageComponent,
		JobDetailComponent,
		ApplicationFormComponent,
		JobsBrowserComponent,
		PersonalInfoComponent,
		OwnedJobsComponent,
		JobApplicationListComponent,
	],
	imports: [
		CommonModule,
		BaseCommonModule,
		RouterModule.forChild(recruitmentRoutes),
		NgxsModule.forFeature([RecruitmentState]),
	],
	exports: [RecruitmentPageComponent, JobDetailComponent],
	providers: [RecruiterApiService, ApplicatorService],
})
export class RecruitmentModule {}
