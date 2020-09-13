import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { RecruitmentModule } from "./core/recruitment/recruitment.module";
import { ProfileModule } from "./core/profile/profile.module";
import { AuthModule } from "./core/auth/auth.module";

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, RecruitmentModule, ProfileModule, AuthModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
