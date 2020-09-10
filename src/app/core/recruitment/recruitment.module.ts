import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BaseCommonModule } from "../../common/base-common.module";
import { RecruitmentPageComponent } from "./recruitment-page/recruitment-page.component";
@NgModule({
	declarations: [RecruitmentPageComponent],
	imports: [CommonModule, BaseCommonModule],
	exports: [RecruitmentPageComponent],
})
export class RecruitmentModule {}
