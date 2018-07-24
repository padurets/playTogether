/**
 * Получает список игр пользователей
 */

import asyncMap from "../../../lib/asyncMap";
import steamOriginApiRequest from "../__common__/steamOriginApiRequest";

export interface UserGame {
	appid: number;
	playtime_forever: number;
}

export interface UserGames {
	ownerId: string;
	games: UserGame[];
}

export type UsersGames = UserGames[];

async function getUserGame(steamId: string): Promise<UserGames> {
	const games = await steamOriginApiRequest(
		`IPlayerService/GetOwnedGames/v0001/?steamid=${steamId}&format=json`
	).then(res => {
		const { games = [] } = res;
		return games;
	});

	return {
		ownerId: steamId,
		games
	};
}

export async function getUsersGames(steamIds: string[]) {
	const usersGames = await asyncMap<UserGames, string>(steamIds, getUserGame);

	return usersGames;
}
