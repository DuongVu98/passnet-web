import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiModule } from "./api/api.module";
import { FirebaseAppModule } from "./firebase-auth/firebase-app.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdbModule } from "./mdb/mdb.module";
import { MaterialModule } from "./material/material.module";

@NgModule({
	declarations: [],
	imports: [CommonModule, FormsModule, ApiModule, FirebaseAppModule, MdbModule, MaterialModule, ReactiveFormsModule],
	exports: [CommonModule, FormsModule, ApiModule, FirebaseAppModule, MdbModule, MaterialModule, ReactiveFormsModule],
})
export class BaseCommonModule {}
