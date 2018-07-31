/**
 * Получает сводную информацию о пользователях
 */

// import asyncMap from "../../../lib/asyncMap";
import steamOriginApiRequest from "../__common__/steamOriginApiRequest";
// import { UserGameSteamApi, getUserGames } from "./games";
import { RequestStatus } from "./profiles";

export interface User {
	name: string;
	requestStatus: RequestStatus;
	info?: UserSteamApi;
}

export interface UserSteamApi {
	steamid: string;
	communityvisibilitystate: number;
	profilestate: number;
	personaname: string;
	lastlogoff: number;
	profileurl: string;
	avatar: string;
	avatarmedium: string;
	avatarfull: string;
	personastate: number;
	realname: string;
	primaryclanid: string;
	timecreated: number;
	personastateflags: number;
}

export interface UserVanityURLSteamApi {
	steamid: string;
	success: number;
}

export interface PlayersSteamApi {
	players: UserSteamApi[];
}

export async function getId(username: string): Promise<string> {
	const url = `ISteamUser/ResolveVanityURL/v0001/?vanityurl=${username}`;

	return steamOriginApiRequest<UserVanityURLSteamApi>(url).then(res => {
		const { steamid = username } = res;
		return steamid;
	});
}

export async function getUsers(steamIds: string[]): Promise<User[]> {
	if (!steamIds.length) {
		return Promise.resolve([] as User[]);
	}

	const ids = steamIds.join(",");
	const url = `ISteamUser/GetPlayerSummaries/v0002/?steamids=${ids}`;
	const mapUsers = (usersSteam: UserSteamApi[]): User[] => {
		return steamIds.map((steamId: string) => {
			const user: User = {
				requestStatus: 2,
				name: steamId
			};

			usersSteam.some(userSteam => {
				const isMatch = userSteam.steamid === steamId;

				if (isMatch) {
					const isAvailable = userSteam.communityvisibilitystate === 3;
					user.requestStatus = isAvailable ? 1 : 3;
					user.info = userSteam;
				}

				return isMatch;
			});

			return user;
		});
	};

	return steamOriginApiRequest<PlayersSteamApi>(url)
		.then(res => {
			if (!res.hasOwnProperty("players")) {
				throw "not correct response by PlayersSteamApi";
			}

			return res.players;
		})
		.then((res?: UserSteamApi[]) => {
			if (res) {
				const users = mapUsers(res);

				return users;
			}

			return [];
		});
}
