/**
 * Возвращает список общих игр у пользователей
 */

import * as express from "express";
import * as steam from "../../services/steam";
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

const filterMultiplayerGames = (games: steam.SteamApiGames) =>
	games.filter(game => game.tags.hasOwnProperty("Multiplayer"));

const formatGames = (game: steam.SteamApiGames): Types.Games =>
	game.map((game: steam.SteamApiGame) => {
		const { appid: id, name, tags } = game;
		return { id, name, tags };
	});

async function getCommonGames(req: express.Request, res: express.Response) {
	const { users: usersQuery } = req.query;

	if (!usersQuery) {
		return res.json({ commonGames: [] });
	}

	try {
		const usernames = usersQuery.split(",");
		const usersId = await steam.getUsersId(usernames);
		const usersGames = await steam.getUsersGames(usersId);
		const commonGames = findUsersCommonGames(usersGames);
		const gamesDetail = await steam.getGamesInfo(commonGames);
		const multiplayerGames = filterMultiplayerGames(gamesDetail);
		const formattedGame = formatGames(multiplayerGames);
		const response: Types.SuccesResponse = { commonGames: formattedGame };

		res.json(response);
	} catch (e) {
		res.statusCode = 502;
		res.json({ error: true });
	}
}

export default getCommonGames;
