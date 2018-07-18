import * as store from "./store";
export const path = {
	posts: "p",
	trash: "trash"
};

interface RouteToProps {
	newTab?: boolean;
	isNative?: boolean;
}

type RouteTo = (url: string, props?: RouteToProps) => void;

export const to: RouteTo = (url, props = {}) => {
	const { newTab, isNative } = props;
	const { pathname } = store.history.location;

	if (isNative) {
		window.location.href = url;
	} else {
		if (newTab) {
			window.open(`${location.origin}${url}`);
		} else {
			if (url !== pathname) {
				store.history.push(url);
			}
		}
	}
};
