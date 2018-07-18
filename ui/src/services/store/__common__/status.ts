export type Value = 0 | 1 | 2 | 3;
export const FAIL = 3 as Value;
export const INIT = 0 as Value;
export const PENDING = 1 as Value;
export const SUCCESS = 2 as Value;

export class Instance {
	public isFail: boolean;
	public isSuccess: boolean;
	public isInit: boolean;
	public isPending: boolean;

	constructor(num: number) {
		this.isInit = num === INIT;
		this.isPending = num === PENDING;
		this.isFail = num === FAIL;
		this.isSuccess = num === SUCCESS;
	}
}
