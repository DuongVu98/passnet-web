import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiModule } from "./api/api.module";
import { FirebaseAppModule } from "./firebase-auth/firebase-app.module";
import { FormsModule } from "@angular/forms";
import { MdbModule } from "./mdb/mdb.module";
@NgModule({
	declarations: [],
	imports: [CommonModule, FormsModule, ApiModule, FirebaseAppModule, MdbModule],
	exports: [CommonModule, FormsModule, ApiModule, FirebaseAppModule, MdbModule],
})
export class BaseCommonModule {}
