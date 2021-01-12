import { Routes } from "@angular/router";
import { PostedJobListComponent } from "./posted-job-list/posted-job-list.component";

export const profileRoutes: Routes = [
	{ path: "", redirectTo: "owned-jobs", pathMatch: "full" },
	{ path: "owned-jobs", component: PostedJobListComponent },
];
