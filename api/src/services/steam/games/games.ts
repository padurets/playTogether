/**
 * Возвращает описание игр
 */

import fetch from "node-fetch";
import asyncMap from "../../../lib/asyncMap";
import * as redis from "../../redis/redis";

export interface GameDetailSteamApi {
	appid: number;
	name: string;
	developer: string;
	publisher: string;
	score_rank: number;
	positive: number;
	negative: number;
	userscore: number;
	owners: string;
	average_forever: number;
	average_2weeks: number;
	median_forever: number;
	median_2weeks: number;
	price: string;
	initialprice: string;
	discount: string;
	languages: string;
	genre: string;
	ccu: number;
	tags: GameTags;
	preview: string;
}

export interface GameTags {
	[key: string]: number;
}

async function getGameFromSteamSpy(appId: number) {
	const url = `http://steamspy.com/api.php?request=appdetails&appid=${appId}`;
	return fetch(url).then(res => res.json());
}

export async function getGameDetail(appId: number) {
	const gameKey = `game_${appId}`;
	let gameInfo = await redis.getAsyncJson(gameKey);

	if (!gameInfo) {
		gameInfo = await getGameFromSteamSpy(appId);
		redis.setAsyncJson(gameKey, gameInfo);
	}

	return gameInfo;
}

export async function getGamesDetail(
	appsId: number[]
): Promise<GameDetailSteamApi[]> {
	return await asyncMap<GameDetailSteamApi, number>(appsId, getGameDetail);
}
