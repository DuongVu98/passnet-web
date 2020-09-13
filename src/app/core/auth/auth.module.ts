import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { BaseCommonModule } from "../../common/base-common.module";
import { FormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "./store/auth.state";

@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, BaseCommonModule, FormsModule, NgxsModule.forFeature([AuthState])],
	exports: [LoginComponent],
})
export class AuthModule {}
