import * as CommonGamesApi from "../../../../api/src/methods/commonGames/types";
import * as status from "./__common__/status";

export type Status = status.Instance;

export type ActionNamesIndex = { [key: string]: string };

export interface Action<P> {
	type: string;
	status: status.Value;
	payload?: P | Error;
}

export interface State<P> {
	status: status.Instance;
	payload?: P;
	error?: Error;
}

export interface Router {
	location: {
		hash: string;
		pathname: string;
		search: string;
		state?: string;
	};
}

export interface States {
	commonGames: State<CommonGamesApi.Games>;
	router: Router;
}

export type Dispatcher<P> = (action: Action<P> | ActionThunk<P>) => void;
export type ActionThunk<P> = (dispatсh: Dispatcher<P>) => void;

export interface Error {
	code: number;
}
