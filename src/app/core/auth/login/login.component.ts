import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { LoginService } from "../services/login.service";

@Component({
	selector: "auth-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	email: string;
	password: string;

	constructor(private loginService: LoginService, private router: Router) {}

	ngOnInit(): void {}

	login(): void {
		console.log(`email: ${this.email} - password: ${this.password}`);
		this.loginService.login(this.email, this.password);
		this.router.navigate(["/"]);
	}

	googleLogin(): void {
        this.loginService.loginWithGoogle();
        this.router.navigate(["/"]);
	}

	logout(): void {
        this.loginService.logout();
        this.router.navigate(["/"]);
	}
}
