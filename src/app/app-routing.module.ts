import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { OktaAuthGuard, OktaCallbackComponent } from "@okta/okta-angular";
import { LoginComponent } from "./core/auth/login/login.component";
import { ClassroomPageComponent } from "./core/classroom/classroom-page/classroom-page.component";
import { classroomRoutes } from "./core/classroom/classroom.routing";
import { ProfilePageComponent } from "./core/profile/profile-page/profile-page.component";
import { profileRoutes } from "./core/profile/profile.routing";
import { JobDetailComponent } from "./core/recruitment/job-detail/job-detail.component";
import { RecruitmentPageComponent } from "./core/recruitment/recruitment-page/recruitment-page.component";
import { TaBrowserComponent } from "./core/freelance/ta-browser/ta-browser.component";

export function onAuthRequired(oktaAuth, injector) {
	const router = injector.get(Router);
	router.navigate(["/login"]);
}

const routes: Routes = [
	{
		path: "login/callback",
		component: OktaCallbackComponent,
	},
	{
		path: "login",
		component: LoginComponent,
	},
	{
		path: "",
		component: RecruitmentPageComponent,
		canActivate: [OktaAuthGuard],
		data: {
			onAuthRequired,
		},
	},
	{
		path: "recruitment",
		component: RecruitmentPageComponent,
		canActivate: [OktaAuthGuard],
		data: {
			onAuthRequired,
		},
	},
	{
		path: "freelance",
		component: TaBrowserComponent,
		canActivate: [OktaAuthGuard],
		data: {
			onAuthRequired,
		},
	},
	{
		path: "profile",
		component: ProfilePageComponent,
		canActivate: [OktaAuthGuard],
		data: {
			onAuthRequired,
		},
		children: profileRoutes,
	},
	{
		path: "job-detail",
		component: JobDetailComponent,
		canActivate: [OktaAuthGuard],
		data: {
			onAuthRequired,
		},
	},
	{
		path: "classrooms",
		component: ClassroomPageComponent,
		canActivate: [OktaAuthGuard],
		data: {
			onAuthRequired,
		},
		children: classroomRoutes,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: false })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
