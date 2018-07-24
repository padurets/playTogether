export interface Props {
	usernames: string[];
	steamIds: string[];
}

export interface SteamApiUserInfo {
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

export type SteamApiUsersInfo = SteamApiUserInfo[];

export interface UserIdInfo {
	name: string;
	id?: string;
	error?: any;
}

export type UsersIdInfo = UserIdInfo[];

export type statusCode =
	| 1 // данные доступны
	| 2 // профиль не найден
	| 3 // профиль скрыт
	| 4; // игр не найдено

export interface UserInfo extends UserIdInfo {
	status: string;
	statusCode: number;
	avatar?: string;
	url?: string;
}

export type UsersInfo = UserInfo[];
