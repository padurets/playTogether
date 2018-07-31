/**
 * Генерирует урл для запроса к Steam Web API
 * делает к нему запрос
 * форматирует выходные данные в json
 */

import { steamKey } from "../../../../../config";
import { callBalancer } from "../../../../../lib/callBalancer";
import fetch from "node-fetch";

export interface Response<T> {
	response: T;
}

interface Options {
	addKey?: boolean;
}

const defaultOptions = {
	addKey: true
};

const balanced = callBalancer({ callsInPeriod: 50 });

const getParamPrefix = (url: string) => {
	return url.indexOf("?") ? "&" : "?";
};

export function steamOriginApiRequest<T>(
	urlPart: string,
	opt?: Options
): Promise<T> {
	return new Promise((resolve, reject) => {
		balanced(() => {
			const options = Object.assign({}, defaultOptions, opt);
			let url = `http://api.steampowered.com/${urlPart}`;

			if (options.addKey) {
				url += `${getParamPrefix(url)}key=${steamKey}`;
			}

			return fetch(url)
				.then(res => res.json())
				.then((res: Response<T>) => {
					if (!res.hasOwnProperty("response")) {
						throw "not correct response by steam api";
					}

					return res.response;
				})
				.then(resolve)
				.catch(reject);
		});
	});
}

export default steamOriginApiRequest;
