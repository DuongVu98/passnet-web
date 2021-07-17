import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
	AddExperienceRequest,
	EditExperienceRequest,
	ExperienceDto,
	ProfileDto,
	UpdateBasicInfoRequest,
} from "../models/profile.models";

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

	getExperienceById(expId: string, profileId: string): Observable<ExperienceDto> {
		return this.httpClient.get<ExperienceDto>(
			`${this.profileApiServer}/api/query/profiles/${profileId}/experiences/${expId}`,
			{}
		);
	}

	updateProfileBasicInfo(updateRequest: UpdateBasicInfoRequest, profileId: string): Observable<any> {
		return this.httpClient.put(`${this.profileApiServer}/api/profiles/${profileId}/update-profile`, updateRequest);
	}

	addExperience(addExperienceForm: AddExperienceRequest, studentId: string): Observable<any> {
		return this.httpClient.post(
			`${this.profileApiServer}/api/profiles/${studentId}/add-experience`,
			addExperienceForm
		);
	}

	editExperience(editExpForm: EditExperienceRequest, studentId: string): Observable<any> {
		return this.httpClient.put(`${this.profileApiServer}/api/profiles/${studentId}/edit-experience`, editExpForm);
	}
}
