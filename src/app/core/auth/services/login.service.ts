import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, of } from "rxjs";
import { UserModel } from "../auth.models";
import { switchMap } from "rxjs/operators";
import { auth } from "firebase/app";

@Injectable({
	providedIn: "root",
})
export class LoginService {
	user$: Observable<UserModel>;
	constructor(private afStore: AngularFirestore, private afAuth: AngularFireAuth) {
		this.user$ = this.afAuth.authState.pipe(
			switchMap((user) => {
				if (user) {
					return this.afStore.doc<UserModel>(`users/${user.uid}`).valueChanges();
				} else {
					return of(null);
				}
			})
		);
	}

	async googleSignin(): Promise<void> {
		const provider = new auth.GoogleAuthProvider();
		const credential = await this.afAuth.auth.signInWithPopup(provider);
		return this.updateUserData(credential.user);
	}

	private updateUserData({ uid, email, displayName, photoURL }: UserModel): any {
		const userRef: AngularFirestoreDocument<UserModel> = this.afStore.doc(`users/${uid}`);
		const data = {
			uid,
			email,
			displayName,
			photoURL,
		};
		return userRef.set(data, { merge: true });
	}
}
