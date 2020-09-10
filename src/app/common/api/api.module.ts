import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecruitmentApiService } from "./recruitment-api.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
	declarations: [],
	imports: [CommonModule, HttpClientModule],
	providers: [RecruitmentApiService],
})
export class ApiModule {}
