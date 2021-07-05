import { Component, OnInit } from "@angular/core";
import { RecruiterApiService } from "../services/recruiter-api.service";
import { ApplicatorService } from "../services/applicator-api.service";
import { Router } from "@angular/router";

@Component({
	selector: "recruitment-recruitment-page",
	templateUrl: "./recruitment-page.component.html",
	styleUrls: ["./recruitment-page.component.scss"],
})
export class RecruitmentPageComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
