import * as uniq from "uniq";
import asyncMap from "../../../lib/asyncMap";
import { getUsers, getId, User } from "./users";
import { UserGameSteamApi, getUserGames } from "./games";

export interface Profile extends User {
	games: UserGameSteamApi[];
}

export type RequestStatus =
	| 1 // данные доступны
	| 2 // профиль не найден
	| 3 // профиль скрыт
	| 4; // игр не найдено

export interface Props {
	usernames: string[];
	steamIds: string[];
}

export async function getProfile(user: User): Promise<Profile> {
	const { requestStatus } = user;
	const profile = { ...user, games: [] as UserGameSteamApi[] };

	if (requestStatus === 1 && user.info) {
		const { steamid } = user.info;
		const games = await getUserGames(steamid);

		if (!games.length) {
			profile.requestStatus = 4;
		} else {
			profile.games = games;
		}

		return profile;
	}

	return profile;
}

export async function getProfiles(props: Props): Promise<Profile[]> {
	const { usernames, steamIds } = props;
	const usernamesIds = await asyncMap(usernames, getId);
	const usersIds = uniq([...usernamesIds, ...steamIds]);
	const users = await getUsers(usersIds);
	const profiles = await asyncMap(users, getProfile);

	return profiles;
}
