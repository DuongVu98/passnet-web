import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiModule } from "./api/api.module";
import { FirebaseAuthModule } from "./firebase-auth/firebase-auth.module";

@NgModule({
	declarations: [],
	imports: [CommonModule, ApiModule, FirebaseAuthModule],
})
export class BaseCommonModule {}
