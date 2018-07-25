import { RequestStatus, Profile } from "../../services/steam/profiles/profiles";

export interface GameTags {
	[key: string]: number;
}

export interface Game {
	id: number;
	name: string;
	tags: GameTags;
}

export type ErrorMessage = string | null;

export interface User {
	name: string;
	requestStatus: RequestStatus;
	avatar?: string;
	status?: string;
	url?: string;
}

export interface UsersIndex {
	usersIncluded: User[];
	usersExcluded: User[];
}

export interface UsersIndexExtended extends UsersIndex {
	profilesIncluded: Profile[];
	profilesExcluded: Profile[];
}

export interface SuccesResponse extends UsersIndex {
	games: Game[];
	errorMessage: ErrorMessage;
}
