import { Routes } from "@angular/router";
import { ClassroomManagementComponent } from "./classroom-management/classroom-management.component";
import { ClassroomSpaceComponent } from "./classroom-space/classroom-space.component";

export const classroomRoutes: Routes = [
	{ path: "", redirectTo: "classrooms-management", pathMatch: "full" },
	{ path: "classrooms-management", component: ClassroomManagementComponent },
	{ path: "space", component: ClassroomSpaceComponent },
];
