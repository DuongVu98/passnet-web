import { Component, OnInit } from "@angular/core";
import { LoginService } from "../services/login.service";

import { SetLoggedUser } from "../store/auth.actions";
import { UserModel } from "../models/auth.models";

@Component({
	selector: "auth-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	email: string;
	password: string;

	constructor(private loginService: LoginService) {}

	ngOnInit(): void {}

	login(): void {
		console.log(`email: ${this.email} - password: ${this.password}`);
		this.loginService.login(this.email, this.password);
	}

	googleLogin(): void {
		this.loginService.loginWithGoogle();
	}

	logout(): void {
		this.loginService.logout();
	}
}
