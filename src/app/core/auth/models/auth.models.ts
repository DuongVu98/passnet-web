export class UserModel {
	uid: string;
	email: string;
	displayname?: string;
	photoURl?: string;

	withUid(uid: string): UserModel {
		this.uid = uid;
		return this;
	}
	withEmail(email: string): UserModel {
		this.email = email;
		return this;
	}
}
