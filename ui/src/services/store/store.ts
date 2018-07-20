import createBrowserHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, createStore } from "redux";
import { connect as reduxConnect } from "react-redux";
import { withRouter } from "react-router";
import thunk from "redux-thunk";
import reducers from "./reducers";
import * as StoreTypes from "./types";

export const history = createBrowserHistory();
const historyMiddleware = routerMiddleware(history);
export const reduxStore = createStore(
	reducers,
	applyMiddleware(historyMiddleware, thunk)
);
export const { dispatch, getState, subscribe } = reduxStore;
export const connect = (
	mapStateToProps: (state: StoreTypes.States) => any,
	component: any,
	props?: { withRouterProps?: boolean }
) => {
	if (typeof props !== "undefined") {
		const { withRouterProps } = props;

		if (withRouterProps) {
			return withRouter(reduxConnect(mapStateToProps)(component));
		}
	}

	return reduxConnect(mapStateToProps)(component);
};

export * from "./types";
