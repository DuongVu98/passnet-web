import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { DepartmentDto, OrganizationLiteDto } from "../models/auth.models";

const organizerApiHost = environment.organizerApi;

@Injectable({
	providedIn: "root",
})
export class OrganizerApiService {
	constructor(private httpClient: HttpClient) {}

	getAllOrganizers(): Observable<OrganizationLiteDto[]> {
		return this.httpClient.get<OrganizationLiteDto[]>(`${organizerApiHost}/api/query/organizations`);
	}

	getDepartments(orgId: string): Observable<DepartmentDto[]> {
		return this.httpClient.get<DepartmentDto[]>(`${organizerApiHost}/api/query/organizations/${orgId}/departments`);
	}
}
