import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class RecruitmentApiService {

    private recruitementApiServer = environment.recruitmentApi;

	constructor() {}

	testEnv(): void {
		console.log(`hello env --> ${this.recruitementApiServer}`);
	}
}
