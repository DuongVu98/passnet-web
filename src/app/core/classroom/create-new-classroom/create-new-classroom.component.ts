import { Component, OnDestroy, OnInit } from "@angular/core";
import { ClassroomService } from "../services/classroom.service";
import { BehaviorSubject, Subscription } from "rxjs";

interface JobView {
	jobId: string;
	jobTitle: string;
	courseName: string;
}

@Component({
	selector: "classroom-create-new-classroom",
	templateUrl: "./create-new-classroom.component.html",
	styleUrls: ["./create-new-classroom.component.scss"],
})
export class CreateNewClassroomComponent implements OnInit, OnDestroy {
	inputSelectedJob: JobView;
	ownedPostedJobsView: JobView[];
	inputCourseName: string;
	acceptedTeacherAssistents: string[];

	inputSeletedJob$: BehaviorSubject<JobView>;
	componetSubsription: Subscription;

	constructor(private classroomService: ClassroomService) {
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
			this.classroomService.getAcceptedTasFromJob(selectedJob.jobId).subscribe((result) => {
				this.acceptedTeacherAssistents = result;
			});
		});
		this.fetchData();
	}

	ngOnDestroy(): void {
		this.componetSubsription.unsubscribe();
	}

	fetchData(): void {
		this.classroomService.getOwnPostedJobs().subscribe((result) => {
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
		this.classroomService.createClassroom(
			this.inputCourseName,
			this.acceptedTeacherAssistents,
			this.inputSelectedJob.jobId
		);
	}
}
