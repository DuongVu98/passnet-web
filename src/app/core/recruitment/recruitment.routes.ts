import { Routes } from "@angular/router";
import { JobsBrowserComponent } from "./jobs-browser/jobs-browser.component";
import { JobDetailComponent } from "./job-detail/job-detail.component";
import { OwnedJobsComponent } from "./owned-jobs/owned-jobs.component";

export const recruitmentRoutes: Routes = [
	{ path: "", redirectTo: "browser", pathMatch: "full" },
	{ path: "browser", component: JobsBrowserComponent },
	{ path: "owned-jobs", component: OwnedJobsComponent },
	{ path: "job-detail", component: JobDetailComponent },
];
