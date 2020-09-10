import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class RecruitmentApiService {
	constructor() {
		console.log(environment.recruitmentApi);
	}
}
