import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { BaseCommonModule } from "src/app/common/base-common.module";
import { AddJobFormComponent } from "./add-job-form/add-job-form.component";
import { PostedJobListComponent } from "./posted-job-list/posted-job-list.component";
import { JobManagementComponent } from "./job-management/job-management.component";
import { RouterModule } from "@angular/router";
import { profileRoutes } from "./profile.routing";
import { JobApplicationListComponent } from "./job-application-list/job-application-list.component";
import { PersonalInfoComponent } from "./personal-info/personal-info.component";
import { NgxsModule } from "@ngxs/store";
import { ProfileState } from "./store/profile.state";
import { BasicEditComponent } from "./basic-edit/basic-edit.component";
import { AddExpFormComponent } from "./add-exp-form/add-exp-form.component";
import { EditExpFormComponent } from "./edit-exp-form/edit-exp-form.component";

@NgModule({
	declarations: [
		ProfilePageComponent,
		AddJobFormComponent,
		PostedJobListComponent,
		JobManagementComponent,
		JobApplicationListComponent,
		PersonalInfoComponent,
		BasicEditComponent,
		AddExpFormComponent,
		EditExpFormComponent,
	],
	imports: [
		CommonModule,
		BaseCommonModule,
		RouterModule.forChild(profileRoutes),
		NgxsModule.forFeature([ProfileState]),
	],
	exports: [ProfilePageComponent, AddJobFormComponent],
})
export class ProfileModule {}
