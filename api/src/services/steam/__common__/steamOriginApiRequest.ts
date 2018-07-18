/**
 * Генерирует урл для запроса к Steam Web API
 * делает к нему запрос
 * форматирует выходные данные в json
 */

import { steamKey } from "../../../../../config";
import fetch from "node-fetch";

interface Options {
	addKey?: boolean;
}

const defaultOptions = {
	addKey: true
};

const getParamPrefix = (url: string) => {
	return url.indexOf("?") ? "&" : "?";
};

export async function steamOriginApiRequest(urlPart: string, opt?: Options) {
	const options = Object.assign({}, defaultOptions, opt);
	let url = `http://api.steampowered.com/${urlPart}`;

	if (options.addKey) {
		url += `${getParamPrefix(url)}key=${steamKey}`;
	}

	return fetch(url)
		.then(res => res.json())
		.then(res => res.response);
}

export default steamOriginApiRequest;
