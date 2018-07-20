import * as steam from "../../services/steam";

export interface Game {
	id: number;
	name: string;
	tags: steam.GameTags;
}

export type Games = Game[];

export interface SuccesResponse {
	commonGames: Games;
}
