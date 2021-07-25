import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiModule } from "./api/api.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdbModule } from "./mdb/mdb.module";
import { MaterialModule } from "./material/material.module";
import { PrimengModule } from "./primeng/primeng.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpRequestInterceptor } from "./interceptors/http-request.interceptor";
import { AuthenticationInterceptor } from "./interceptors/authentication.interceptor";
import { CreateClassroomFormComponent } from "./components/create-classroom-form/create-classroom-form.component";
import { HttpErrorInterceptor } from "./interceptors/http-error.interceptor";

@NgModule({
	declarations: [CreateClassroomFormComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ApiModule,
		MdbModule,
		MaterialModule,
		PrimengModule,
		FlexLayoutModule.withConfig({
			useColumnBasisZero: false,
			printWithBreakpoints: ["md", "lt-lg", "lt-xl", "gt-sm", "gt-xs"],
		}),
	],
	providers: [
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
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpErrorInterceptor,
			multi: true,
		},
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ApiModule,
		MdbModule,
		MaterialModule,
		PrimengModule,
		CreateClassroomFormComponent,
		FlexLayoutModule,
	],
})
export class BaseCommonModule {}
