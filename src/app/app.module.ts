import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsDataPluginModule } from "@ngxs-labs/data";
import { NGXS_DATA_STORAGE_PLUGIN } from "@ngxs-labs/data/storage";

import { BaseCommonModule } from "./common/base-common.module";
import { RecruitmentModule } from "./core/recruitment/recruitment.module";
import { ProfileModule } from "./core/profile/profile.module";
import { AuthModule } from "./core/auth/auth.module";
import { ClassroomModule } from "./core/classroom/classroom.module";
import { environment } from "src/environments/environment";
import { HttpClientModule } from "@angular/common/http";
import { OktaAuthModule, OKTA_CONFIG } from "@okta/okta-angular";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NgxsModule.forRoot([], {
			developmentMode: !environment.production,
		}),
		NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_PLUGIN]),
		NgxsReduxDevtoolsPluginModule.forRoot(),
		NgxsLoggerPluginModule.forRoot(),
		BaseCommonModule,
		RecruitmentModule,
		ProfileModule,
		AuthModule,
		ClassroomModule,
		HttpClientModule,
		OktaAuthModule,
	],
	providers: [
		{
			provide: OKTA_CONFIG,
			useValue: {
				issuer: "https://dev-96211074.okta.com/oauth2/default",
				redirectUri: window.location.origin + "/login/callback",
				clientId: "0oa126nrgljPb0QHO5d7",
				pkce: true,
			},
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
