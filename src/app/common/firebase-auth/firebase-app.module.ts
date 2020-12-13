import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../../../environments/environment";

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule,
	],
})
export class FirebaseAppModule {}
