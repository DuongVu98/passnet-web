import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { BehaviorSubject, Subscription } from "rxjs";
import { ClassroomApiService } from "../../api/classroom-api.service";
import { RecruitmentApiService } from "src/app/common/api/recruitment-api.service";
import { JobViewDto } from "../../models/recruitment.models";
import { Select } from "@ngxs/store";
import { AuthState, LoggedUserStateSelection } from "src/app/core/auth/store/auth.state";
import { map } from "rxjs/operators";

interface JobView {
	jobId: string;
	jobTitle: string;
	courseName: string;
}

@Component({
	selector: "common-create-classroom-form",
	templateUrl: "./create-classroom-form.component.html",
	styleUrls: ["./create-classroom-form.component.scss"],
})
export class CreateClassroomFormComponent implements OnInit {
	@Select(AuthState.getLoggedUser)
	loggedUser$: Observable<LoggedUserStateSelection>;

	memberId: string;

	inputSelectedJob: JobView;
	ownedPostedJobsView: JobView[];
	inputCourseName: string;
	acceptedTeacherAssistents: string[];

	inputSeletedJob$: BehaviorSubject<JobView>;
	componetSubsription: Subscription;

	constructor(
		private classroomApiService: ClassroomApiService,
		private recruitmentApiService: RecruitmentApiService
	) {
		this.loggedUser$.subscribe((loggedUser) => {
			this.memberId = loggedUser.user.uid;
		});

		this.ownedPostedJobsView = [];
		this.acceptedTeacherAssistents = [];
		this.inputSeletedJob$ = new BehaviorSubject({
			jobId: "",
			jobTitle: "",
			courseName: "",
		});
	}

	ngOnInit(): void {
		this.componetSubsription = this.inputSeletedJob$.asObservable().subscribe((selectedJob) => {
			this.inputSelectedJob = selectedJob;
			this.getAcceptedTasFromJob(selectedJob.jobId).subscribe((result) => {
				this.acceptedTeacherAssistents = result;
			});
		});
		this.fetchData();
	}

	ngOnDestroy(): void {
		this.componetSubsription.unsubscribe();
	}

	fetchData(): void {
		this.getOwnPostedJobs().subscribe((result) => {
			this.ownedPostedJobsView = result.map((jobViewDto) => {
				return {
					jobId: jobViewDto.id,
					jobTitle: jobViewDto.jobTitle,
					courseName: jobViewDto.courseName,
				};
			});
		});
	}

	reactiveChange(value: JobView): void {
		this.inputSeletedJob$.next(value);
	}

	submitCreateClassroomForm(): void {
		this.createClassroom(this.inputCourseName, this.acceptedTeacherAssistents, this.inputSelectedJob.jobId);
	}

	getAcceptedTasFromJob(jobId: string): Observable<string[]> {
		if (jobId === "") {
			return of([]);
		} else {
			return this.recruitmentApiService.getAllJobApplicationList(jobId).pipe(
				map((list) => list.jobApplicationViewList),
				map((viewList) => viewList.filter((dto) => dto.state === "ACCEPTED").map((dto) => dto.studentId))
			);
		}
	}

	getOwnPostedJobs(): Observable<JobViewDto[]> {
		return this.recruitmentApiService.getOwnedJobs(this.memberId);
	}

	createClassroom(courseName: string, taIds: string[], jobId: string) {
		this.classroomApiService.createClassroom(this.memberId, courseName, taIds, jobId).subscribe();
	}
}
