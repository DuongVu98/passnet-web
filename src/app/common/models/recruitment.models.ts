export class ApplicationFormDto {
	letter: string;
	content: string;

	withLetter(letter: string): ApplicationFormDto {
		this.letter = letter;
		return this;
	}
	withContent(content: string): ApplicationFormDto {
		this.content = content;
		return this;
	}
}

export class JobViewDto {
	id: string;
	courseName: string;
	jobTitle: string;
	semester: string;
	department: string;
	appliedAmount: number;
}
export class JobViewListDto {
	litePostedJobs: JobViewDto[];
}
