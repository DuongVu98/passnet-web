import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { ProfileService } from "../services/profile.service";
import { MenuItem } from "primeng/api";
import { BasicEditComponent } from "../basic-edit/basic-edit.component";
import { Store } from "@ngxs/store";
import { SetStudentProfileAction, SetTeacherProfileAction } from "../store/profile.action";
import { AddExpFormComponent } from "../add-exp-form/add-exp-form.component";
interface PersonalInfo {
	fullName: string;
	username: string;
	email: string;
	phoneNumber: string;
	univerity: string;
	cardId: string;
	experiences: Experience[];
}

interface Experience {
	id: string;
	course: string;
	semester: string;
	description: string;
}

@Component({
	selector: "profile-personal-info",
	templateUrl: "./personal-info.component.html",
	styleUrls: ["./personal-info.component.scss"],
})
export class PersonalInfoComponent implements OnInit, OnDestroy {
	personalInfo: PersonalInfo;

	subscriptions: Subscription[];
	menuItems: MenuItem[];
	editProfileDialog: boolean;
	addExperienceVisible: boolean;

	@ViewChild(BasicEditComponent)
	profileEditComponent: BasicEditComponent;

	@ViewChild(AddExpFormComponent)
	addExpForm: AddExpFormComponent;

	constructor(private profileService: ProfileService, private store: Store) {
		this.personalInfo = {
			fullName: "",
			username: "",
			email: "",
			phoneNumber: "",
			univerity: "",
			cardId: "",
			experiences: [],
		};
		this.menuItems = [
			{
				label: "Edit",
				icon: "pi pi-fw pi-pencil",
				command: () => this.openProfileEditForm(),
			},
		];
		this.editProfileDialog = false;
		this.addExperienceVisible = false;
		this.subscriptions = [];
	}
	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => {
			sub.unsubscribe();
		});
	}

	ngOnInit(): void {
		this.subscriptions.push(
			this.profileService.getPersonalInfo().subscribe((result) => {
				this.personalInfo.fullName = result.fullName;
				this.personalInfo.username = result.username;
				this.personalInfo.email = result.email;
				this.personalInfo.phoneNumber = result.phoneNumber;

				if (result.student != null) {
					this.personalInfo.cardId = result.student.cardId;
					this.store.dispatch(
						new SetStudentProfileAction({
							fullName: result.fullName,
							email: result.email,
							phoneNumber: result.phoneNumber,
							overview: result.student.overview,
							cardId: result.student.cardId,
						})
					);
				} else {
					this.store.dispatch(
						new SetTeacherProfileAction({
							fullName: result.fullName,
							email: result.email,
							phoneNumber: result.phoneNumber,
							overview: result.student.overview,
						})
					);
				}
			}),
			this.profileService.getExperiencesByProfile().subscribe((result) => {
				result.forEach((r) => {
					this.personalInfo.experiences.push({
						id: "",
						course: r.course,
						semester: r.semester,
						description: r.description,
					});
				});
			})
		);
	}

	openProfileEditForm(): void {
		this.editProfileDialog = true;
	}

	submitAndCloseDialog(): void {
		this.editProfileDialog = false;
		this.profileEditComponent.submitUpdate();
	}
	openAddExpForm() {
		this.addExperienceVisible = true;
	}
	closeAddExpForm() {
		this.addExpForm.submit().subscribe(() => {
			this.addExperienceVisible = false;
		});
	}
	openEditForm(expId: string) {}
}
