// import * as api from "../../api";
import * as CommonGamesApi from "../../../../../api/src/methods/commonGames/types";
import * as Store from "../store";
import { dispatchAsyncAction } from "../__common__";
import * as status from "../__common__/status";
import * as ACTIONS from "./actionNames";

export const list = (
	usernames: string[]
): Store.ActionThunk<CommonGamesApi.SuccesResponse> => {
	return () => {
		dispatchAsyncAction(ACTIONS.LIST, status.PENDING);

		fetch(`/api/commonGames?users=${usernames.join()}`)
			.then((res: Response) => res.json())
			.then((payload: CommonGamesApi.SuccesResponse) => {
				dispatchAsyncAction(ACTIONS.LIST, status.SUCCESS, payload.commonGames);
			})
			.catch((err: Store.Error) =>
				dispatchAsyncAction(ACTIONS.LIST, status.FAIL, err)
			);
	};
};
