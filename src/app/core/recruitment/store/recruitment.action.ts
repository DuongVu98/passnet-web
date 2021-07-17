export class SetMenuActiveItemAction {
	static readonly type = "[Recruitment] SetMenuActiveItem";
	constructor(public payload: { item: string }) {}
}
