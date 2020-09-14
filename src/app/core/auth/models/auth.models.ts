export class UserModel {
	uid: string;
	email: string;
	displayname?: string;
	photoURl?: string;

	setUid(uid: string): UserModel {
		this.uid = uid;
		return this;
	}
	setEmail(email: string): UserModel {
		this.email = email;
		return this;
	}
}
