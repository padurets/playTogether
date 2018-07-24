import * as GamesInfo from "../../services/steam/getGamesInfo/types";
import * as UsersInfo from "../../services/steam/getUsersInfo/types";

export interface Game {
	id: number;
	name: string;
	tags: GamesInfo.GameTags;
}

export type Games = Game[];

export type ErrorMessage = string | null;

export interface SuccesResponse {
	games: Games;
	users: UsersInfo.UsersInfo;
	errorMessage: ErrorMessage;
}
