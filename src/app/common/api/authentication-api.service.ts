import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RegisterForm } from "../models/auth.models";

const authenticationApiServer = environment.authenticationApi;

@Injectable({
	providedIn: "root",
})
export class AuthenticaionApiService {
	constructor(private httpClient: HttpClient) {}

	register(registerForm: RegisterForm): Observable<any> {
		return this.httpClient.post(`${authenticationApiServer}/auth/register`, registerForm);
	}
}
