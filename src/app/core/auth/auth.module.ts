import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { BaseCommonModule } from "../../common/base-common.module";
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, BaseCommonModule, FormsModule],
	exports: [LoginComponent],
})
export class AuthModule {}
