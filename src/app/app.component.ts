import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { OktaAuthService } from "@okta/okta-angular";
import { Builder } from "builder-pattern";
import { UserModel } from "./core/auth/models/auth.models";
import { SetLoggedUserAction } from "./core/auth/store/auth.actions";
import { AuthService } from "./core/auth/services/auth.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	title = "passnet-web";
	isAuthenticated: boolean;

	constructor(
		public oktaAuth: OktaAuthService,
		public router: Router,
		private store: Store,
		private authService: AuthService
	) {
		this.oktaAuth.$authenticationState.subscribe(async (isAuthenticated: boolean) => {
			this.isAuthenticated = isAuthenticated;

			if (isAuthenticated == true) {
				let user = await oktaAuth.getUser();

				this.authService.getProfileId(user.sub).subscribe((profileId) => {
					this.store.dispatch(
						new SetLoggedUserAction({
							user: Builder(UserModel)
								.uid(user.sub)
								.profileId(profileId)
								.email(user.email)
								.displayname(user.name)
								.build(),
							token: oktaAuth.getAccessToken(),
						})
					);
				});
			}
		});
	}

	async ngOnInit() {
		this.isAuthenticated = await this.oktaAuth.isAuthenticated();
		console.log(`isAuthenticated: ${this.isAuthenticated}`);
	}

	async logout() {
		await this.oktaAuth.signOut();
		this.router.navigateByUrl("/");
	}
}
