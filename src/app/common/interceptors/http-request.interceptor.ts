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
		let modifiedRequest;
		if (request.headers.get("skip")) {
			modifiedRequest = request.clone({
				headers: new HttpHeaders({
					Accept: "charset=utf-8",
				}),
			});
		} else {
			modifiedRequest = request.clone({
				headers: new HttpHeaders({
					"Access-Control-Allow-Headers":
						"Access-Control-Allow-Origin, access-control-allow-origin, access-control-allow-headers, Origin, X-Requested-With, Content-Type, Accept, Authorization",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
				}),
			});
		}

		return next.handle(modifiedRequest);
	}
}
