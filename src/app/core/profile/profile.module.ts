import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { BaseCommonModule } from "src/app/common/base-common.module";
import { AddJobFormComponent } from "./add-job-form/add-job-form.component";
import { PostedJobListComponent } from "./posted-job-list/posted-job-list.component";
import { JobManagementComponent } from './job-management/job-management.component';
import { RouterModule } from "@angular/router";

import { profileRoutes } from "./profile.routing"

@NgModule({
	declarations: [ProfilePageComponent, AddJobFormComponent, PostedJobListComponent, JobManagementComponent],
	imports: [CommonModule, BaseCommonModule, RouterModule.forChild(profileRoutes)],
	exports: [ProfilePageComponent, AddJobFormComponent],
})
export class ProfileModule {}
