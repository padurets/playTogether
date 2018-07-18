/**
 * Получает список игр пользователей
 */

import asyncMap from "../../../lib/asyncMap";
import steamOriginApiRequest from "../__common__/steamOriginApiRequest";
import { UserSummary, getUsersSummary } from "../getUsersInfo/getUsersInfo";

interface UserSteamId {
	steamid: string;
}

type UserInfo = UserSteamId | UserSummary;

export interface UserGame {
	appid: number;
	playtime_forever: number;
}

export interface UserGames {
	user: UserInfo;
	games: UserGame[];
}

export type UsersGames = UserGames[];

interface Options {
	loadUserInfo: boolean;
}

const defaultOptions = {
	loadUserInfo: true,
	loadGameInfo: true
};

async function getUserGame(user: UserInfo): Promise<UserGames> {
	const games = await steamOriginApiRequest(
		`IPlayerService/GetOwnedGames/v0001/?steamid=${user.steamid}&format=json`
	).then(res => res.games);

	return {
		user,
		games
	};
}

export async function getUsersGames(steamIds: string[], opt?: Options) {
	const options = Object.assign({}, defaultOptions, opt);
	const usersInfo = options.loadUserInfo
		? await getUsersSummary(steamIds)
		: steamIds.map(steamid => ({ steamid }));
	const usersGames = await asyncMap<UserGames, UserInfo>(
		usersInfo,
		getUserGame
	);

	return usersGames;
}
