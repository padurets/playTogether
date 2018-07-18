/**
 * Возвращает список общих игр у пользователей
 */

import * as express from "express";
import * as steam from "../../services/steam";

export interface SuccesResponse {
	commonGames: steam.Games;
}

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

async function getCommonGames(req: express.Request, res: express.Response) {
	const { users: usersQuery } = req.query;

	if (!usersQuery) {
		return res.json({ commonGames: [] });
	}

	const usernames = usersQuery.split(",");
	const usersId = await steam.getUsersId(usernames);
	const usersGames = await steam.getUsersGames(usersId, {
		loadUserInfo: false
	});
	const commonGames = findUsersCommonGames(usersGames);
	const gamesDetail = await steam.getGamesInfo(commonGames);

	res.json({ commonGames: gamesDetail });
}

export default getCommonGames;
