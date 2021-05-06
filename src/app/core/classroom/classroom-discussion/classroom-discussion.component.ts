import { Component, OnInit } from "@angular/core";
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
export class ClassroomDiscussionComponent implements OnInit {
	posts: PostView[];
	commentContent: string;

	constructor(private spaceService: ClassroomSpaceService) {
		this.posts = [];
		this.commentContent = "";
	}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData() {
		this.spaceService.getAllPosts().subscribe((allPosts) => {
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

	addComment(postId: string): void {
		this.spaceService.addCommentToPost(postId, this.commentContent).subscribe(() => {
			this.commentContent = "";
		});
	}
}
