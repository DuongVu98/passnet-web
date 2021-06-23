import { Component, OnInit } from "@angular/core";
import { ClassroomSpaceService } from "../services/classroom-space.service";
import { Observable } from "rxjs";

@Component({
	selector: "classroom-classroom-create-new-post",
	templateUrl: "./classroom-create-new-post.component.html",
	styleUrls: ["./classroom-create-new-post.component.scss"],
})
export class ClassroomCreateNewPostComponent implements OnInit {
	postContent: string;

	constructor(private spaceService: ClassroomSpaceService) {
		this.postContent = "";
	}

	ngOnInit(): void {}

	submitForm(): Observable<any> {
		return this.spaceService.createNewPost(this.postContent);
	}
}
