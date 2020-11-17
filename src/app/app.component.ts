import { Component } from "@angular/core";
import { LogoutPublisher } from "./common/publishers/logout.publisher";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	title = "passnet-web";
	constructor(private logoutPublisher: LogoutPublisher) {}

	logout(): void {
		this.logoutPublisher.send("logout");
	}
}
