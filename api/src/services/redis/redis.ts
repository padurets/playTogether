import * as Redis from "redis";
import { promisify } from "util";
import * as config from "../../../../config";

type Key = string | number;

export const client = Redis.createClient(config.redisOptions);
export const getAsync = promisify(client.get).bind(client);
export const setAsync = promisify(client.set).bind(client);

export async function setAsyncJson<T>(key: Key, value: T) {
	const string = JSON.stringify(value);
	return await setAsync(String(key), string);
}

export async function getAsyncJson(key: Key) {
	const string = await getAsync(String(key));
	const value = string ? JSON.parse(string) : undefined;

	return value;
}

client.on("error", (err: Error) => console.log(`redis error ${err}`));
