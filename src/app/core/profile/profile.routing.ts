import { Routes } from "@angular/router";
import { JobApplicationListComponent } from "./job-application-list/job-application-list.component";
import { PostedJobListComponent } from "./posted-job-list/posted-job-list.component";

export const profileRoutes: Routes = [
	{ path: "", redirectTo: "owned-jobs", pathMatch: "full" },
	{ path: "owned-jobs", component: PostedJobListComponent },
	{ path: "job-application-list", component: JobApplicationListComponent },
];
