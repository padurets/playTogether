/**
 * Получает steamId пользователей
 */

import asyncMap from "../../../lib/asyncMap";
import steamOriginApiRequest from "../__common__/steamOriginApiRequest";

type UserId = string;
type UserIds = UserId[];

export async function getUserId(username: string): Promise<UserId> {
	return steamOriginApiRequest(
		`ISteamUser/ResolveVanityURL/v0001/?vanityurl=${username}`
	).then(res => {
		if (res && res.success !== 1) {
			return { error: new Error(JSON.stringify(res)) };
		}

		return res.steamid;
	});
}

export async function getUsersId(usernames: string[]): Promise<UserIds> {
	const usersId = await asyncMap(usernames, getUserId);

	return usersId;
}
