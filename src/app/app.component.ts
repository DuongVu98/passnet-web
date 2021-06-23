import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OktaAuthService } from "@okta/okta-angular";
import { LogoutPublisher } from "./common/publishers/logout.publisher";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	title = "passnet-web";
	isAuthenticated: boolean;

	constructor(public oktaAuth: OktaAuthService, public router: Router) {
		this.oktaAuth.$authenticationState.subscribe(
			(isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated)
		);
	}

	async ngOnInit() {
		this.isAuthenticated = await this.oktaAuth.isAuthenticated();
        console.log(`isAuthenticated: ${this.isAuthenticated}`)
	}

	login() {
		this.oktaAuth.signInWithRedirect({
			originalUri: "/",
		});
        console.log("logged from app")
	}

	async logout() {
		await this.oktaAuth.signOut();
		this.router.navigateByUrl("/");
	}
}
