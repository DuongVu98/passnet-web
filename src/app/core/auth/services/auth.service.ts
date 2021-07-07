import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ProfileApiService } from "../../../common/api/profile-api.service";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(private profileApiService: ProfileApiService) {}

	getProfileId(uid: string): Observable<string> {
		return this.profileApiService.getProfileByUserId(uid).pipe(map((profileDto) => profileDto.profileId));
	}
}
