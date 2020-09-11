import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { BaseCommonModule } from "src/app/common/base-common.module";

@NgModule({
	declarations: [ProfilePageComponent],
	imports: [CommonModule, BaseCommonModule],
	exports: [ProfilePageComponent],
})
export class ProfileModule {}
