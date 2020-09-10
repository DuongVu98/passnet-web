import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { RecruitmentModule } from "./core/recruitment/recruitment.module";
@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, RecruitmentModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
