// import { Reducer } from "redux";
import * as status from "./status";
import * as StoreTypes from "../types";
import * as Store from "../";

const addStatusToActionName = (actionName: string, status: status.Value) =>
	`${actionName}/${status}`;

const defaultAsyncState = {
	status: new status.Instance(status.INIT)
};

export const createAsyncAction = <T = {}>(
	actionName: string,
	status: status.Value,
	payload?: T
): StoreTypes.Action<T> => {
	const type = addStatusToActionName(actionName, status);

	return {
		payload,
		status,
		type
	};
};

export const dispatchAsyncAction = <T>(
	actionName: string,
	status: status.Value,
	payload?: T
) => {
	const action = createAsyncAction<T>(actionName, status, payload);
	Store.dispatch(action);
};

export const reduceAsyncActions = <T>(
	actionNamesIndex: StoreTypes.ActionNamesIndex
) => {
	const actionNames = Object.keys(actionNamesIndex);
	const asyncActionNames = actionNames.map(actionName => {
		const actionUniqName = actionNamesIndex[actionName];

		return [
			addStatusToActionName(actionUniqName, status.FAIL),
			addStatusToActionName(actionUniqName, status.PENDING),
			addStatusToActionName(actionUniqName, status.SUCCESS)
		];
	});

	return (
		state: StoreTypes.State<T> = defaultAsyncState,
		action: StoreTypes.Action<T>
	): StoreTypes.State<T> => {
		const {
			type: committedActionName,
			payload: data,
			status: statusValue
		} = action;
		const statusInstance = new status.Instance(statusValue);
		const needReduce = asyncActionNames.some(actionsGroup =>
			actionsGroup.some(actionName => actionName === committedActionName)
		);

		if (needReduce) {
			if (!statusInstance.isFail) {
				const payload = data as T;
				return { payload, status: statusInstance };
			} else {
				const error = data as StoreTypes.Error;
				return { payload: state.payload, error, status: statusInstance };
			}
		}

		return state;
	};
};

export { status };
