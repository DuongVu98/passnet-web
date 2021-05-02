import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiModule } from "./api/api.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdbModule } from "./mdb/mdb.module";
import { MaterialModule } from "./material/material.module";
import { PrimengModule } from "./primeng/primeng.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { HttpRequestInterceptor } from "./interceptors/http-request.interceptor";
import { AuthenticationInterceptor } from "./interceptors/authentication.interceptor";
import { LogoutPublisher } from "./publishers/logout.publisher";
import { CreateClassroomFormComponent } from './components/create-classroom-form/create-classroom-form.component';

@NgModule({
	declarations: [CreateClassroomFormComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, ApiModule, MdbModule, MaterialModule, PrimengModule],
	providers: [
		LogoutPublisher,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpRequestInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthenticationInterceptor,
			multi: true,
		},
	],
	exports: [CommonModule, FormsModule, ReactiveFormsModule, ApiModule, MdbModule, MaterialModule, PrimengModule, CreateClassroomFormComponent],
})
export class BaseCommonModule {}
