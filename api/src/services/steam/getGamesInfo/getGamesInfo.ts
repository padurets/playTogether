/**
 * Возвращает описание игр
 */

import fetch from "node-fetch";
import asyncMap from "../../../lib/asyncMap";
import * as redis from "../../redis/redis";
import * as Types from "./types";

async function getGameInfoFromSteamSpy(appId: Types.GameId) {
	const url = `http://steamspy.com/api.php?request=appdetails&appid=${appId}`;
	return fetch(url).then(res => res.json());
}

// async function getGameInfoFromSteamStore(appId: GameId) {
// 	const url = `https://store.steampowered.com/api/appdetails/?appids=${appId}`;
// 	return fetch(url)
// 		.then(res => res.json())
// 		.then(res => res[appId].data);
// }

export async function getGameInfo(appId: Types.GameId) {
	const gameKey = `game_${appId}`;
	let gameInfo = await redis.getAsyncJson(gameKey);

	if (!gameInfo) {
		const [gameInfoFromSteamSpy] = await Promise.all([
			getGameInfoFromSteamSpy(appId)
			// getGameInfoFromSteamStore(appId)
		]);

		gameInfo = {
			...gameInfoFromSteamSpy
			// preview: GameInfoFromSteamStore.header_image
		};

		redis.setAsyncJson(gameKey, gameInfo);
	}

	return gameInfo;
}

export async function getGamesInfo(
	appsId: Types.GamesId
): Promise<Types.SteamApiGames> {
	return await asyncMap<Types.SteamApiGame, Types.GameId>(appsId, getGameInfo);
}

export * from "./types";
