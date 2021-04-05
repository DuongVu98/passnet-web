import { Routes } from "@angular/router";
import { ClassroomManagementComponent } from "./classroom-management/classroom-management.component";

export const classroomRoutes: Routes = [
	{ path: "", redirectTo: "classrooms-management", pathMatch: "full" },
	{ path: "classrooms-management", component: ClassroomManagementComponent },
];
