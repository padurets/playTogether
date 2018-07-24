/**
 * Получает сводную информацию о пользователях
 */

import steamOriginApiRequest from "../__common__/steamOriginApiRequest";
import asyncMap from "../../../lib/asyncMap";
import * as uniq from "uniq";
import * as Types from "./types";

export async function getUserId(username: string): Promise<string> {
	return steamOriginApiRequest(
		`ISteamUser/ResolveVanityURL/v0001/?vanityurl=${username}`
	).then(res => {
		const { steamid = username } = res;
		return steamid;
	});
}

async function getUserInfoById(
	steamIds: string[]
): Promise<Types.SteamApiUsersInfo> {
	if (!steamIds.length) {
		return Promise.resolve([]);
	}

	return steamOriginApiRequest(
		`ISteamUser/GetPlayerSummaries/v0002/?steamids=${steamIds.join(",")}`
	).then(res => res.players);
}

export async function getUsersInfo(
	props: Types.Props
): Promise<Types.UsersInfo> {
	const { usernames, steamIds } = props;
	const idForUsernames = await asyncMap(usernames, getUserId);
	const usersIds = uniq([...idForUsernames, ...steamIds]);
	const usersInfo = await getUserInfoById(usersIds);
	const formattedUsersInfo = usersIds.map(
		(usersId: string): Types.UserInfo => {
			const formattedUserInfo = {
				statusCode: 2,
				status: "Профиль не найден",
				name: usersId
			} as Types.UserInfo;

			usersInfo.some((userInfo: Types.SteamApiUserInfo) => {
				const isMatch = userInfo.steamid === usersId;

				if (isMatch) {
					const {
						personaname,
						realname,
						steamid,
						communityvisibilitystate
					} = userInfo;
					const isAvailable = communityvisibilitystate === 3;
					formattedUserInfo.statusCode = isAvailable ? 1 : 3;
					formattedUserInfo.status = isAvailable ? "" : "Профиль скрыт";
					formattedUserInfo.id = steamid;
					formattedUserInfo.name = personaname
						? personaname
						: realname
							? realname
							: steamid;
					formattedUserInfo.url = userInfo.profileurl;
					formattedUserInfo.avatar = userInfo.avatarfull;
				}

				return isMatch;
			});

			return formattedUserInfo;
		}
	);

	return formattedUsersInfo;
}
