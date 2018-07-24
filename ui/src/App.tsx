import "./assets/styles";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import * as Store from "./services/store";
import HomePage from "./pages/Home/Home";
import CatalogPage from "./pages/Catalog/Catalog";

const generateRootNode = () => {
	const node = document.createElement("div");
	document.body.appendChild(node);
	return node;
};

render(
	<Provider store={Store.reduxStore}>
		<ConnectedRouter history={Store.history}>
			<Switch>
				<Route path="/commonGames/" component={CatalogPage} />
				<Route component={HomePage} />
			</Switch>
		</ConnectedRouter>
	</Provider>,
	generateRootNode()
);
