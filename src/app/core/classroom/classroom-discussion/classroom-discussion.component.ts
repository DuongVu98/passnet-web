import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { ClassroomCreateNewPostComponent } from "../classroom-create-new-post/classroom-create-new-post.component";
import { ClassroomSpaceService } from "../services/classroom-space.service";

export interface PostView {
	postId: string;
}

@Component({
	selector: "classroom-classroom-discussion",
	templateUrl: "./classroom-discussion.component.html",
	styleUrls: ["./classroom-discussion.component.scss"],
})
export class ClassroomDiscussionComponent implements OnInit, OnDestroy {
	posts: PostView[];
	displayCreatePostForm: boolean;

	@ViewChild(ClassroomCreateNewPostComponent)
	classroomCreateNewPostComponent: ClassroomCreateNewPostComponent;

	dataSubscription: Subscription;

	constructor(private spaceService: ClassroomSpaceService) {
		this.posts = [];
		this.displayCreatePostForm = false;
	}

	ngOnInit(): void {
		this.fetchData();
	}

	ngOnDestroy(): void {
		this.dataSubscription.unsubscribe();
	}

	fetchData() {
		this.dataSubscription = this.spaceService.getAllPosts().subscribe((allPosts) => {
			allPosts.map((post) => post.postId).forEach((postId) => this.posts.push({ postId }));
		});
	}

	openCreatePostForm() {
		this.displayCreatePostForm = true;
	}

	submitAndClose() {
		this.classroomCreateNewPostComponent.submitForm().subscribe(() => {
			this.displayCreatePostForm = false;
			this.posts = [];
			this.fetchData();
		});
	}
}
