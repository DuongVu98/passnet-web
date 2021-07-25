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
import { ClassroomSpaceComponent } from "./classroom-space/classroom-space.component";
import { NgxsModule } from "@ngxs/store";
import { ClassroomState } from "./store/classroom.state";
import { ClassroomDiscussionComponent } from "./classroom-discussion/classroom-discussion.component";
import { ClassroomAssignmentComponent } from "./classroom-assignment/classroom-assignment.component";
import { ClassroomFilesComponent } from "./classroom-files/classroom-files.component";
import { ClassroomSpaceService } from "./services/classroom-space.service";
import { ClassroomCreateNewPostComponent } from "./classroom-create-new-post/classroom-create-new-post.component";
import { DiscussionPostComponent } from "./discussion-post/discussion-post.component";
import { JoinClassFormComponent } from "./join-class-form/join-class-form.component";
import { MemberListComponent } from "./member-list/member-list.component";

@NgModule({
	declarations: [
		ClassroomPageComponent,
		ClassroomManagementComponent,
		ClassroomListComponent,
		CreateNewClassroomComponent,
		ClassroomSpaceComponent,
		ClassroomDiscussionComponent,
		ClassroomAssignmentComponent,
		ClassroomFilesComponent,
		ClassroomCreateNewPostComponent,
		DiscussionPostComponent,
		JoinClassFormComponent,
		MemberListComponent,
	],
	imports: [
		CommonModule,
		BaseCommonModule,
		RouterModule.forChild(classroomRoutes),
		NgxsModule.forFeature([ClassroomState]),
	],
	exports: [ClassroomPageComponent, CreateNewClassroomComponent],
	providers: [ClassroomService, ClassroomSpaceService],
})
export class ClassroomModule {}
