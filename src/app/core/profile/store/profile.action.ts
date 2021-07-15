export class ChangeTabViewAction {
	static readonly type = "[Profile] ChangeTabView";
	constructor(
		public payload: {
			tabIndex: number;
		}
	) {}
}
