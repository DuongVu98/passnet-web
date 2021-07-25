export class ClassroomViewDto {
	classroomId: string;
	courseName: string;
	students: string[];
	teacher: string;
	code: string;
	teacherAssistanceList: string[];
}

export class PostViewDto {
	postId: string;
	postOwner: string;
	content: string;
	comments: CommentViewDto[];
}

export class CommentViewDto {
	commentId: string;
	commentOwner: string;
	content: string;
}
