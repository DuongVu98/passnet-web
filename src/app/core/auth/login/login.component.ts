import { Component, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { OktaAuthService } from "@okta/okta-angular";

import * as OktaSignIn from "@okta/okta-signin-widget";
import { environment } from "src/environments/environment";

@Component({
	selector: "auth-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	authService;
	widget = new OktaSignIn({
		el: "#okta-signin-container",
		baseUrl: `https://${environment.okta.domain}`,
		authParams: {
			pkce: true,
		},
		clientId: environment.okta.clientId,
		redirectUri: environment.okta.redirectUri,
	});

	constructor(private oktaAuth: OktaAuthService, private router: Router) {
		this.authService = oktaAuth;

		router.events.forEach((event) => {
			if (event instanceof NavigationStart) {
				switch (event.url) {
					case "/login":
						console.log("logged in");
						break;
					case "/classrooms":
						break;
					case "/profile":
						break;
					case "/":
						break;
					default:
						this.widget.remove();
						break;
				}
			}
		});
	}

	ngOnInit() {
		this.widget.showSignInAndRedirect().catch((err) => {
			throw err;
		});
	}
}
