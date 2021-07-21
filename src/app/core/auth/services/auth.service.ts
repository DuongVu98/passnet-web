import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ProfileApiService } from "../../../common/api/profile-api.service";
import { DepartmentLiteDto, OrganizationLiteDto, RegisterForm, OrgMemberDto } from "../../../common/models/auth.models";
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

	getStudentByUserid(userId: string): Observable<OrgMemberDto> {
		return this.organizerApiService.getStudentByUid(userId);
	}

	getAllOrganizations(): Observable<OrganizationLiteDto[]> {
		return this.organizerApiService.getAllOrganizers();
	}

	getDepartments(orgId: string): Observable<DepartmentLiteDto[]> {
		return this.organizerApiService.getDepartments(orgId);
	}
}
