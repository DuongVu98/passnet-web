import { Component, Input, OnInit } from "@angular/core";
import { ClassroomSpaceService } from "../services/classroom-space.service";

export interface PostView {
	postId: string;
	owner: {
		id: string;
		name: string;
		role: string;
	};
	content: string;
	comments: {
		commentId: string;
		ownerId: string;
		content: string;
	}[];
}

@Component({
	selector: "classroom-discussion-post",
	templateUrl: "./discussion-post.component.html",
	styleUrls: ["./discussion-post.component.scss"],
})
export class DiscussionPostComponent implements OnInit {
	@Input()
	postId: string;

	post: PostView;
	commentContent: string;

	constructor(private spaceService: ClassroomSpaceService) {
		this.post = {
			postId: "",
			owner: {
				id: "",
				name: "",
				role: "",
			},
			content: "",
			comments: [],
		};
		this.commentContent = "";
	}

	ngOnInit(): void {
		this.spaceService.getAllPosts().subscribe((allPosts) => {
			this.post = allPosts
				.filter((post) => post.postId === this.postId)
				.map((post) => {
					let comments = [];
					post.comments.forEach((cmt) => {
						comments.push({
							commentId: cmt.commentId,
							ownerId: cmt.commentOwner,
							content: cmt.content,
						});
					});
					return {
						postId: post.postId,
						owner: {
							id: post.postOwner,
							name: "",
							role: "",
						},
						content: post.content,
						comments: comments,
					};
				})
				.map((post) => {
					this.spaceService.getOwnerProfile(post.owner.id).subscribe((owner) => {
						this.post.owner.name = owner.name;
						this.post.owner.role = owner.role;
					});
					return post;
				})[0];
		});
	}
	addComment(postId: string): void {
		this.spaceService.addCommentToPost(postId, this.commentContent).subscribe(() => {
			this.commentContent = "";
		});
	}
}
