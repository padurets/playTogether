export interface SteamApiUserGame {
	appid: number;
	playtime_forever: number;
}

export type SteamApiUserGames = SteamApiUserGame[];

// export interface UserIdInfo {
// 	name: string;
// 	id?: string;
// 	error?: string;
// }

// export type UsersIdInfo = UserIdInfo[];

// export interface UserInfo extends UserIdInfo {
// 	status: string;
// 	statusCode: number;
// 	avatar?: string;
// 	url?: string;
// }

// export type UsersInfo = UserInfo[];

// // export interface UserGames {
// // 	ownerId: string;
// // 	games: UserGame[];
// // }

// export interface Response {
// 	users: UsersInfo;
// 	games: UsersGames;
// }
