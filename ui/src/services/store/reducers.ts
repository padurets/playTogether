import { routerReducer as router } from "react-router-redux";
import { combineReducers } from "redux";
import * as StoreTypes from "./types";
import * as commonGamesReducers from "./commonGames/reducers";

export const reducers = combineReducers<any, StoreTypes.Action<any>>({
	...commonGamesReducers,
	router
});

export default reducers;
