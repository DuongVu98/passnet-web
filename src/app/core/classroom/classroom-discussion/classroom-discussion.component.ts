import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { ClassroomCreateNewPostComponent } from "../classroom-create-new-post/classroom-create-new-post.component";
import { ClassroomSpaceService } from "../services/classroom-space.service";

export interface PostView {
	postId: string;
	ownerId: string;
	content: string;
	comments: {
		commentId: string;
		ownerId: string;
		content: string;
	}[];
}

@Component({
	selector: "classroom-classroom-discussion",
	templateUrl: "./classroom-discussion.component.html",
	styleUrls: ["./classroom-discussion.component.scss"],
})
export class ClassroomDiscussionComponent implements OnInit, OnDestroy {
	posts: PostView[];
	commentContent: string;
	displayCreatePostForm: boolean;

	@ViewChild(ClassroomCreateNewPostComponent)
	classroomCreateNewPostComponent: ClassroomCreateNewPostComponent;

	dataSubscription: Subscription;

	constructor(private spaceService: ClassroomSpaceService) {
		this.posts = [];
		this.commentContent = "";
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
			allPosts.forEach((post) => {
				let postToPush = {
					postId: post.postId,
					ownerId: post.postOwner,
					content: post.content,
					comments: [],
				};

				post.comments.forEach((cmt) => {
					postToPush.comments.push({
						commentId: cmt.commentId,
						ownerId: cmt.commentOwner,
						content: cmt.content,
					});
				});

				this.posts.push(postToPush);
			});
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

	addComment(postId: string): void {
		this.spaceService.addCommentToPost(postId, this.commentContent).subscribe(() => {
			this.commentContent = "";
		});
	}
}
