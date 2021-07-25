import { Routes } from "@angular/router";
import { ClassroomAssignmentComponent } from "./classroom-assignment/classroom-assignment.component";
import { ClassroomDiscussionComponent } from "./classroom-discussion/classroom-discussion.component";
import { ClassroomFilesComponent } from "./classroom-files/classroom-files.component";
import { ClassroomManagementComponent } from "./classroom-management/classroom-management.component";
import { ClassroomSpaceComponent } from "./classroom-space/classroom-space.component";
import { MemberListComponent } from "./member-list/member-list.component";

export const classroomRoutes: Routes = [
	{ path: "", redirectTo: "classrooms-management", pathMatch: "full" },
	{ path: "classrooms-management", component: ClassroomManagementComponent },
	{
		path: "space",
		component: ClassroomSpaceComponent,
		children: [
			{ path: "discussion", component: ClassroomDiscussionComponent },
			{ path: "assignments", component: ClassroomAssignmentComponent },
			{ path: "files", component: ClassroomFilesComponent },
			{ path: "members", component: MemberListComponent },
		],
	},
];
