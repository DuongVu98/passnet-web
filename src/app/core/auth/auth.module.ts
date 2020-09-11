import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { BaseCommonModule } from "../../common/base-common.module";

@NgModule({
	declarations: [LoginComponent, BaseCommonModule],
	imports: [CommonModule],
	exports: [LoginComponent],
})
export class AuthModule {}
