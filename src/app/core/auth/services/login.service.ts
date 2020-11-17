import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { auth } from "firebase/app";
import { Store } from "@ngxs/store";
import { SetLoggedUserAction, UserLogoutAction } from "../store/auth.actions";

import { UserModel } from "../models/auth.models";
import { AuthenticaionApiService } from "src/app/common/api/authentication-api.service";
import { LogoutPublisher } from "src/app/common/publishers/logout.publisher";

@Injectable({
	providedIn: "root",
})
export class LoginService {
	user: User;
	constructor(
		private afAuth: AngularFireAuth,
		private authenticationApiService: AuthenticaionApiService,
		private store: Store,
		private logoutPublisher: LogoutPublisher
	) {
		logoutPublisher.getObservable().subscribe((event) => {
			console.log("logout event");
			this.logout();
		});
	}

	async login(email: string, password: string): Promise<void> {
		this.authenticationApiService.login(email, password).subscribe((result) => {
			console.log(`loggedUser --> ${JSON.stringify(result)}`);
			if (result) {
				const loggedUser = result.user_dto;
				this.store.dispatch(
					new SetLoggedUserAction({
						user: new UserModel().withUid(loggedUser.uid).withEmail(loggedUser.email),
						token: result.token,
					})
				);
			}
		});
	}

	async loginWithGoogle(): Promise<void> {
		await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
		console.log(`log in to firebase with google`);
	}

	logout(): void {
		this.store.dispatch(new UserLogoutAction());
	}
}
