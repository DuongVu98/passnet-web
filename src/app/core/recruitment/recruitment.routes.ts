import { Routes } from "@angular/router";
import { JobsBrowserComponent } from "./jobs-browser/jobs-browser.component";
import { JobDetailComponent } from "./job-detail/job-detail.component";

export const recruitmentRoutes: Routes = [
	{ path: "", redirectTo: "browser", pathMatch: "full" },
	{ path: "browser", component: JobsBrowserComponent },
	{ path: "job-detail", component: JobDetailComponent },
];
