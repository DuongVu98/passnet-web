import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthState } from "src/app/core/auth/store/auth.state";
import { Select } from "@ngxs/store";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
	@Select(AuthState.getLoggedUser) loggedUser$: Observable<any>;

	constructor() {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(this.produceHeadersForRequest(request));
	}

	produceHeadersForRequest(oldRequest: HttpRequest<unknown>): HttpRequest<unknown> {
		let modifiedRequest;
		this.loggedUser$.subscribe((loggedUser) => {
			const headers = new HttpHeaders({
				"Access-Control-Allow-Headers":
					"Access-Control-Allow-Origin, access-control-allow-origin, access-control-allow-headers, Origin, X-Requested-With, Content-Type, Accept, Authorization",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
				Authentication: loggedUser.token ? loggedUser.token : "",
			});
			modifiedRequest = oldRequest.clone({ headers });
		});
		console.log(`headers --> ${modifiedRequest.headers.get("Authentication")}`);
		return modifiedRequest;
	}
}
