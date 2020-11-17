import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { Select } from "@ngxs/store";

import { AuthState } from "../../core/auth/store/auth.state";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
	@Select(AuthState.getLoggedUser) loggedUser$: Observable<any>;

	constructor() {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		this.loggedUser$.subscribe((loggedUser) => {
			if (loggedUser.token != null) {
				request.headers.set("Authentication", `Bearer ${loggedUser.token}`);
			}
		});
		return next.handle(request);
	}
}
