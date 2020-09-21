import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./core/auth/login/login.component";
import { ProfilePageComponent } from "./core/profile/profile-page/profile-page.component";
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
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule],
})
export class AppRoutingModule {}
