/**
 * Получает список игр пользователей
 */

import steamOriginApiRequest from "../__common__/steamOriginApiRequest";

export interface UserGameSteamApi {
	appid: number;
	playtime_forever: number;
}

export async function getUserGames(
	steamid: string
): Promise<UserGameSteamApi[]> {
	const url = `IPlayerService/GetOwnedGames/v0001/?steamid=${steamid}&format=json`;
	const userGames = await steamOriginApiRequest(url).then(res => {
		const { games = [] } = res;
		return games;
	});

	return userGames;
}
