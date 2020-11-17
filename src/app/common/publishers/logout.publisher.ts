import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class LogoutPublisher {
	private bus = new Subject();

    public getObservable(): Observable<any> {
		return this.bus.asObservable();
	}

	public send(event: any): void {
		console.log(`log event from publisher --> ${event}`);
		this.bus.next(event);
	}
}
