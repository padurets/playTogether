/**
 * Генерирует урл для запроса к Steam Spy API
 * делает к нему запрос
 * форматирует выходные данные в json
 */

import { callBalancer } from "../../../../../lib/callBalancer";
import fetch from "node-fetch";
import * as queryString from "query-string";

interface Params {
	[key: string]: string;
}

const balanced = callBalancer({ callsInPeriod: 4 });

export function steamSpyOriginApiRequest<T>(params: Params): Promise<T> {
	return new Promise((resolve, reject) => {
		balanced(() => {
			const req = queryString.stringify(params);
			const url = `http://steamspy.com/api.php?${req}`;

			return fetch(url)
				.then(res => res.json())
				.then(resolve)
				.catch(reject);
		});
	});
}

export default steamSpyOriginApiRequest;
