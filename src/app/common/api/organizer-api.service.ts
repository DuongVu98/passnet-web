import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { DepartmentLiteDto, OrganizationLiteDto, OrgMemberDto } from "../models/auth.models";

const organizerApiHost = environment.organizerApi;

@Injectable({
	providedIn: "root",
})
export class OrganizerApiService {
	constructor(private httpClient: HttpClient) {}

	getAllOrganizers(): Observable<OrganizationLiteDto[]> {
		return this.httpClient.get<OrganizationLiteDto[]>(`${organizerApiHost}/api/query/organizations`);
	}

	getDepartments(orgId: string): Observable<DepartmentLiteDto[]> {
		return this.httpClient.get<DepartmentLiteDto[]>(
			`${organizerApiHost}/api/query/organizations/${orgId}/departments`
		);
	}

	getStudentByUid(userId: string): Observable<OrgMemberDto> {
		return this.httpClient.get<OrgMemberDto>(`${organizerApiHost}/api/query/student`, {
			params: {
				uid: userId,
			},
		});
	}
}
