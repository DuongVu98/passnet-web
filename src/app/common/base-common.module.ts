import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiModule } from "./api/api.module";
import { FirebaseAppModule } from "./firebase-auth/firebase-app.module";
import { FormsModule } from "@angular/forms";
import { MdbModule } from "./mdb/mdb.module";
import { MaterialModule } from "./material/material.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { HttpRequestInterceptor } from "./interceptors/http-request.interceptor";

@NgModule({
	declarations: [],
	imports: [CommonModule, FormsModule, ApiModule, FirebaseAppModule, MdbModule, MaterialModule],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpRequestInterceptor,
			multi: true,
		},
	],
	exports: [CommonModule, FormsModule, ApiModule, FirebaseAppModule, MdbModule, MaterialModule],
})
export class BaseCommonModule {}
