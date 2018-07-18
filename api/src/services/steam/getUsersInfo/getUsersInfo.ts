/**
 * Получает сводную информацию о пользователе
 */

import steamOriginApiRequest from "../__common__/steamOriginApiRequest";

export interface UserSummary {
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

export type UserSummaries = UserSummary[];

export async function getUsersSummary(
	steamIds: string[]
): Promise<UserSummaries> {
	return steamOriginApiRequest(
		`ISteamUser/GetPlayerSummaries/v0002/?steamids=${steamIds.join(",")}`
	).then(res => res.players);
}
