import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { BaseCommonModule } from "src/app/common/base-common.module";
import { AddJobFormComponent } from "./add-job-form/add-job-form.component";
import { PostedJobListComponent } from "./posted-job-list/posted-job-list.component";

@NgModule({
	declarations: [ProfilePageComponent, AddJobFormComponent, PostedJobListComponent],
	imports: [CommonModule, BaseCommonModule],
	exports: [ProfilePageComponent, AddJobFormComponent],
})
export class ProfileModule {}
