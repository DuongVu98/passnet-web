import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ProfileApiService } from "../../../common/api/profile-api.service";
import { DepartmentDto, OrganizationLiteDto, RegisterForm } from "../../../common/models/auth.models";
import { OrganizerApiService } from "../../../common/api/organizer-api.service";
import { AuthenticaionApiService } from "src/app/common/api/authentication-api.service";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(
		private profileApiService: ProfileApiService,
		private organizerApiService: OrganizerApiService,
		private authenticationApiService: AuthenticaionApiService
	) {}

	register(registerForm: RegisterForm): Observable<any> {
		return this.authenticationApiService.register(registerForm);
	}

	getProfileId(uid: string): Observable<string> {
		return this.profileApiService.getProfileByUserId(uid).pipe(map((profileDto) => profileDto.profileId));
	}

	getAllOrganizations(): Observable<OrganizationLiteDto[]> {
		return this.organizerApiService.getAllOrganizers();
	}

	getDepartments(orgId: string): Observable<DepartmentDto[]> {
		return this.organizerApiService.getDepartments(orgId);
	}
}
