import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AuthenticaionApiService {
	private authenticationApiServer = environment.authenticationApi;

	constructor(private httpClient: HttpClient) {}

	login(userName: string, password: string): Observable<any> {
		return this.httpClient.post(`${this.authenticationApiServer}/auth/login`, {
			emailOrDisplayName: userName,
			password: password,
		});
	}
}
