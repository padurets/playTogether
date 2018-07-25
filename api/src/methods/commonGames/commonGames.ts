/**
 * Возвращает список общих игр у пользователей
 */

import * as express from "express";
// import {
// 	UsersInfo,
// 	UsersGames,
// 	UserGames
// } from "../../services/steam/getUsersInfo/types";
import { getProfiles } from "../../services/steam/profiles/profiles";
import {
	getGamesDetail,
	GameDetailSteamApi
} from "../../services/steam/games/games";
import {
	serializeUsersIndex,
	serializeCommonGames,
	serializeGames
} from "./serializers";
import * as messages from "./messages";
import * as Types from "./types";

const formatProfileValue = (str: string): string[] =>
	str.split(",").filter(val => val !== "");

const filterMultiplayerGames = (games: GameDetailSteamApi[]) =>
	games.filter(game => game.tags.hasOwnProperty("Multiplayer"));

async function getCommonGames(req: express.Request, res: express.Response) {
	const { usernames: usernamesQuery, ids: idsQuery } = req.query;

	if (!idsQuery && !usernamesQuery) {
		return res.json({ error: true, message: "Пользователи не выбраны" });
	}

	const steamIds = idsQuery ? formatProfileValue(idsQuery) : [];
	const usernames = usernamesQuery ? formatProfileValue(usernamesQuery) : [];
	const profiles = await getProfiles({
		usernames,
		steamIds
	});
	const {
		usersIncluded,
		usersExcluded,
		profilesIncluded
	} = serializeUsersIndex(profiles);

	const response: Types.SuccesResponse = {
		usersIncluded,
		usersExcluded,
		games: [],
		errorMessage: null
	};

	if (profilesIncluded.length > 1) {
		const games = serializeCommonGames(profilesIncluded);
		const gamesDetail = await getGamesDetail(games);
		const multiplayerGames = filterMultiplayerGames(gamesDetail);
		const formattedGames = serializeGames(multiplayerGames);

		response.games = formattedGames;

		if (formattedGames.length === 0) {
			response.errorMessage = messages.errorCommonGamesNotFound;
		}
	} else {
		response.errorMessage = messages.errorFewProfiles;
	}

	res.json(response);
}

export default getCommonGames;
