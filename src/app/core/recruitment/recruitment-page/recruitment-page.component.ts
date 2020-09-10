import { Component, OnInit } from "@angular/core";
import { RecruitorApiService } from "../services/recruitor-api.service";

@Component({
	selector: "recruitment-recruitment-page",
	templateUrl: "./recruitment-page.component.html",
	styleUrls: ["./recruitment-page.component.scss"],
})
export class RecruitmentPageComponent implements OnInit {
	constructor(private recruitorApiService: RecruitorApiService) {}

	ngOnInit(): void {
		this.recruitorApiService.testServiceCall();
		console.log("hello");
	}
}
