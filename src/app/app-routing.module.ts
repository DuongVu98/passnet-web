import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./core/auth/login/login.component";
import { ClassroomPageComponent } from "./core/classroom/classroom-page/classroom-page.component";
import { classroomRoutes } from "./core/classroom/classroom.routing";
import { ProfilePageComponent } from "./core/profile/profile-page/profile-page.component";
import { profileRoutes } from "./core/profile/profile.routing";
import { JobDetailComponent } from "./core/recruitment/job-detail/job-detail.component";
import { RecruitmentPageComponent } from "./core/recruitment/recruitment-page/recruitment-page.component";

const routes: Routes = [
	{
		path: "",
		component: RecruitmentPageComponent,
	},
	{
		path: "login",
		component: LoginComponent,
	},
	{
		path: "profile",
		component: ProfilePageComponent,
		children: profileRoutes,
	},
	{
		path: "job-detail",
		component: JobDetailComponent,
	},
	{
		path: "classrooms",
		component: ClassroomPageComponent,
		children: classroomRoutes,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
