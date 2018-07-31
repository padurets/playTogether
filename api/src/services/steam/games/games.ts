/**
 * Возвращает описание игр
 */

import asyncMap from "../../../lib/asyncMap";
import { steamSpyOriginApiRequest } from "../__common__/steamSpyOriginApiRequest";
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

export async function getGameDetail(
	gameId: number
): Promise<GameDetailSteamApi> {
	const appid = `${gameId}`;
	const gameKey = `game_${appid}`;
	let gameInfo = await redis.getAsyncJson(gameKey);

	if (!gameInfo) {
		gameInfo = await steamSpyOriginApiRequest<GameDetailSteamApi>({
			request: "appdetails",
			appid
		});
		redis.setAsyncJson(gameKey, gameInfo);
	}

	return gameInfo;
}

export async function getGamesDetail(
	gamesId: number[]
): Promise<GameDetailSteamApi[]> {
	return await asyncMap(gamesId, getGameDetail);
}
