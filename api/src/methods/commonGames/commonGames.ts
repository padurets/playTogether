/**
 * Возвращает список общих игр у пользователей
 */

import * as express from "express";
import * as steam from "../../services/steam";
import { UsersInfo } from "../../services/steam/getUsersInfo/types";
import * as messages from "./messages";
import * as Types from "./types";

const findUsersCommonGames = (usersGames: steam.UsersGames): number[] => {
	interface GameOwners {
		common: number[];
		index: { [key: number]: number };
	}

	const reducer = (gameOwners: GameOwners, userGames: steam.UserGames) => {
		userGames.games.forEach((game: steam.UserGame) => {
			const { appid } = game;
			const { [appid]: ownersCount = 0 } = gameOwners.index;
			const incrementedOwners = ownersCount + 1;
			gameOwners.index[appid] = incrementedOwners;

			if (incrementedOwners === usersGames.length) {
				gameOwners.common.push(appid);
			}
		});

		return gameOwners;
	};

	const gameOwners = usersGames.reduce(reducer, { common: [], index: {} });
	const { common: commonGames } = gameOwners;

	return commonGames;
};

const formatProfileValue = (str: string): string[] =>
	str.split(",").filter(val => val !== "");

const filterMultiplayerGames = (games: steam.SteamApiGames) =>
	games.filter(game => game.tags.hasOwnProperty("Multiplayer"));

const formatGames = (game: steam.SteamApiGames): Types.Games =>
	game.map((game: steam.SteamApiGame) => {
		const { appid: id, name, tags } = game;
		return { id, name, tags };
	});

const splitUsersByGamesList = (usersGames: steam.UsersGames) => {
	interface WithoutGamesIndex {
		[key: string]: boolean;
	}

	interface SplittedUserByGamesList {
		withGames: steam.UsersGames;
		withoutGamesIndex: WithoutGamesIndex;
	}

	const splittedUsersByGamesList: SplittedUserByGamesList = usersGames.reduce(
		(list, userGames) => {
			const { games, ownerId } = userGames;

			if (games.length > 0) {
				list.withGames.push(userGames);
			} else {
				list.withoutGamesIndex[ownerId] = true;
			}

			return list;
		},
		{
			withGames: [] as steam.UsersGames,
			withoutGamesIndex: {} as WithoutGamesIndex
		}
	);

	return splittedUsersByGamesList;
};

const changeUsersInfoByGamesStatus = (
	usersInfo: UsersInfo,
	usersIndexWithoutGames: { [key: string]: boolean }
): UsersInfo =>
	usersInfo.map(userInfo => {
		const isWithoutGames =
			typeof userInfo.id !== "undefined" &&
			usersIndexWithoutGames.hasOwnProperty(userInfo.id);

		if (isWithoutGames) {
			userInfo.statusCode = 4;
			userInfo.status = "Игры отсутствуют или скрыты";
		}

		return userInfo;
	});

async function getCommonGames(req: express.Request, res: express.Response) {
	const { usernames: usernamesQuery, ids: idsQuery } = req.query;

	if (!idsQuery && !usernamesQuery) {
		return res.json({ error: true, message: "Пользователи не выбраны" });
	}

	const steamIds = idsQuery ? formatProfileValue(idsQuery) : [];
	const usernames = usernamesQuery ? formatProfileValue(usernamesQuery) : [];
	const usersInfo = await steam.getUsersInfo({ usernames, steamIds });
	const response: Types.SuccesResponse = {
		users: usersInfo,
		games: [],
		errorMessage: null
	};
	const usersId = usersInfo
		.filter(userInfo => userInfo.statusCode === 1)
		.map(userInfo => userInfo.id as string);

	if (usersId.length > 1) {
		const usersGames = await steam.getUsersGames(usersId);
		const usersByGamesList = splitUsersByGamesList(usersGames);
		const { withGames, withoutGamesIndex } = usersByGamesList;
		response.users = changeUsersInfoByGamesStatus(usersInfo, withoutGamesIndex);

		if (withGames.length > 1) {
			const games = findUsersCommonGames(withGames);
			const gamesDetail = await steam.getGamesInfo(games);
			const multiplayerGames = filterMultiplayerGames(gamesDetail);
			const formattedGames = formatGames(multiplayerGames);
			response.games = formattedGames;

			if (formattedGames.length === 0) {
				response.errorMessage = messages.errorCommonGamesNotFound;
			}
		} else {
			response.errorMessage = messages.errorFewProfiles;
		}
	} else {
		response.errorMessage = messages.errorFewProfiles;
	}

	res.json(response);
}

export default getCommonGames;
