import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClassroomPageComponent } from "./classroom-page/classroom-page.component";
import { ClassroomManagementComponent } from "./classroom-management/classroom-management.component";
import { BaseCommonModule } from "src/app/common/base-common.module";
import { RouterModule } from "@angular/router";
import { classroomRoutes } from "./classroom.routing";
import { ClassroomListComponent } from "./classroom-list/classroom-list.component";
import { ClassroomService } from "./services/classroom.service";
import { CreateNewClassroomComponent } from "./create-new-classroom/create-new-classroom.component";
import { ClassroomSpaceComponent } from './classroom-space/classroom-space.component';

@NgModule({
	declarations: [
		ClassroomPageComponent,
		ClassroomManagementComponent,
		ClassroomListComponent,
		CreateNewClassroomComponent,
		ClassroomSpaceComponent,
	],
	imports: [CommonModule, BaseCommonModule, RouterModule.forChild(classroomRoutes)],
	exports: [ClassroomPageComponent, CreateNewClassroomComponent],
	providers: [ClassroomService],
})
export class ClassroomModule {}
