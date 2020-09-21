import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiModule } from "./api/api.module";
import { FirebaseAppModule } from "./firebase-auth/firebase-app.module";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [],
	imports: [CommonModule, FormsModule, ApiModule, FirebaseAppModule, MDBBootstrapModule.forRoot()],
	exports: [CommonModule, FormsModule, ApiModule, FirebaseAppModule, MDBBootstrapModule],
})
export class BaseCommonModule {}
