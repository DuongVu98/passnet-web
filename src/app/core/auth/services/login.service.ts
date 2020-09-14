import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { auth } from "firebase/app";
import { Store } from "@ngxs/store";
import { SetLoggedUser } from "../store/auth.actions";
import { UserModel } from "../models/auth.models";

@Injectable({
	providedIn: "root",
})
export class LoginService {
	user: User;
	constructor(private afAuth: AngularFireAuth, private store: Store) {
		this.afAuth.authState.subscribe((user) => {
			if (user) {
				this.user = user;
				console.log(`user logged --> ${JSON.stringify(user)}`);
				this.store.dispatch(new SetLoggedUser(new UserModel().setUid(user.uid).setEmail(user.email)));
			} else {
				console.log(`user not log`);
			}
		});
	}

	async login(email: string, password: string): Promise<void> {
		const result = await this.afAuth.signInWithEmailAndPassword(email, password);
		console.log(`log in to firebase --> ${result}`);
		// this.router.navigate(["admin/list"]);
	}

	async loginWithGoogle(): Promise<void> {
		await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
		console.log(`log in to firebase with google`);
		// this.router.navigate(["admin/list"]);
	}

	async logout(): Promise<void> {
		await this.afAuth.signOut();
		// localStorage.removeItem('user');
		// this.router.navigate(['admin/login']);
	}
}
