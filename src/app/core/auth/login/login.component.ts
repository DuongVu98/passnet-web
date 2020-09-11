import { Component, OnInit } from "@angular/core";
import { LoginService } from "../services/login.service";

@Component({
	selector: "auth-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	constructor(private loginService: LoginService) {}

	ngOnInit(): void {}
}
