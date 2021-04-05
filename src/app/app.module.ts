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
import { GraphQLModule } from "./graphql.module";
import { HttpClientModule } from "@angular/common/http";

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
		// GraphQLModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
