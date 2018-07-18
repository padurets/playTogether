import * as api from "../../api";
import * as Store from "../store";
import { dispatchAsyncAction } from "../__common__";
import * as status from "../__common__/status";
import * as ACTIONS from "./actionNames";

export const list = (id: number): Store.ActionThunk<api.posts.PostDetail> => {
	return () => {
		dispatchAsyncAction(ACTIONS.LIST, status.PENDING);

		api.commonGames
			.list(id)
			.then((payload: api.posts.PostDetail) => {
				dispatchAsyncAction(ACTIONS.LIST, status.SUCCESS, payload);
			})
			.catch((err: Store.Error) =>
				dispatchAsyncAction(ACTIONS.LIST, status.FAIL, err)
			);
	};
};
