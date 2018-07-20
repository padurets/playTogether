export interface GameTags {
	[key: string]: number;
}

export type GameId = number;
export type GamesId = GameId[];

export interface SteamApiGame {
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

export type SteamApiGames = SteamApiGame[];

export interface Game {
	id: number;
	name: string;
	tags: GameTags;
}

export type Games = Game[];
