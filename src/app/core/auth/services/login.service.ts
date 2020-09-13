import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { auth } from "firebase/app";

@Injectable({
	providedIn: "root",
})
export class LoginService {
	user: User;
	constructor(private afStore: AngularFirestore, private afAuth: AngularFireAuth) {
		this.afAuth.authState.subscribe((user) => {
			if (user) {
				this.user = user;
				console.log(`user logged --> ${JSON.stringify(user)}`);
				localStorage.setItem("user", JSON.stringify(this.user));
			} else {
				console.log(`user not log`);
				localStorage.setItem("user", null);
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
