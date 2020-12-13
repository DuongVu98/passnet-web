import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiModule } from "./api/api.module";
import { FirebaseAppModule } from "./firebase-auth/firebase-app.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdbModule } from "./mdb/mdb.module";
import { MaterialModule } from "./material/material.module";
import { PrimengModule } from "./primeng/primeng.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { HttpRequestInterceptor } from "./interceptors/http-request.interceptor";
import { AuthenticationInterceptor } from "./interceptors/authentication.interceptor";
import { LogoutPublisher } from "./publishers/logout.publisher";

@NgModule({
	declarations: [],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, ApiModule, FirebaseAppModule, MdbModule, MaterialModule, PrimengModule],
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
	exports: [CommonModule, FormsModule, ReactiveFormsModule, ApiModule, FirebaseAppModule, MdbModule, MaterialModule, PrimengModule],
})
export class BaseCommonModule {}
