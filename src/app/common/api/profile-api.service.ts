import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ExperienceDto, ProfileDto } from "../models/profile.models";

@Injectable({
	providedIn: "root",
})
export class ProfileApiService {
	private profileApiServer = environment.profileApi;

	constructor(private httpClient: HttpClient) {}

	getProfile(profileId: string): Observable<ProfileDto> {
		return this.httpClient.get<ProfileDto>(`${this.profileApiServer}/api/query/profiles/${profileId}`, {});
	}

	getProfileByUserId(uid: string): Observable<ProfileDto> {
		return this.httpClient.get<ProfileDto>(`${this.profileApiServer}/api/query/profile`, {
			params: {
				uid: uid,
			},
		});
	}

	getExperienceByProfile(profileId: string): Observable<ExperienceDto[]> {
		return this.httpClient.get<ExperienceDto[]>(`${this.profileApiServer}/api/query/experiences`, {
			params: {
				profileId: profileId,
			},
		});
	}
}
