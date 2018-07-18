/**
 * Возвращает описание игр
 */

import fetch from "node-fetch";
import asyncMap from "../../../lib/asyncMap";
import * as redis from "../../redis/redis";

export interface Game {
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

export type Games = Game[];

export interface GameTags {
	[key: string]: number;
}

export type GameId = number;
export type GamesId = GameId[];

async function getGameInfoFromSteamSpy(appId: GameId) {
	const url = `http://steamspy.com/api.php?request=appdetails&appid=${appId}`;
	return fetch(url).then(res => res.json());
}

// async function getGameInfoFromSteamStore(appId: GameId) {
// 	const url = `https://store.steampowered.com/api/appdetails/?appids=${appId}`;
// 	return fetch(url)
// 		.then(res => res.json())
// 		.then(res => res[appId].data);
// }

export async function getGameInfo(appId: GameId) {
	const gameKey = `game_${appId}`;
	let gameInfo = await redis.getAsyncJson(gameKey);

	if (!gameInfo) {
		const [gameInfoFromSteamSpy] = await Promise.all([
			getGameInfoFromSteamSpy(appId)
			// getGameInfoFromSteamStore(appId)
		]);

		// console.log("GameInfoFromSteamStore", GameInfoFromSteamStore);

		gameInfo = {
			...gameInfoFromSteamSpy
			// preview: GameInfoFromSteamStore.header_image
		};
		redis.setAsyncJson(gameKey, gameInfo);
	}

	return gameInfo;
}

export async function getGamesInfo(appsId: GamesId): Promise<Games> {
	return await asyncMap<Game, GameId>(appsId, getGameInfo);
}
