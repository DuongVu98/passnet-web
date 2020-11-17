import { APP_INITIALIZER, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { BaseCommonModule } from "../../common/base-common.module";
import { FormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "./store/auth.state";
import { LoginService } from "./services/login.service";

const initServices = [
    {
        provide: APP_INITIALIZER,
        useFactory: (loginService: LoginService) => () => {},
        deps: [LoginService],
        multi: true,
    },
]

@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, BaseCommonModule, FormsModule, NgxsModule.forFeature([AuthState])],
	providers: [
        LoginService,
        initServices.map(service => service)
	],
	exports: [LoginComponent],
})
export class AuthModule {}
