import { plural } from "../../../../lib/plural";
import { Profile } from "../../services/steam/profiles/profiles";
import { UserGameSteamApi } from "../../services/steam/profiles/games";
import { GameDetailSteamApi } from "../../services/steam/games/games";
import { UsersIndexExtended, User, Game } from "./types";

// | 1 // данные доступны
// | 2 // профиль не найден
// | 3 // профиль скрыт
// | 4; // игр не найдено

// name: string;
// avatar: string;
// status: string;
// url: string;
// requestStatus: RequestStatus;

export const serializeUsersIndex = (
	profiles: Profile[]
): UsersIndexExtended => {
	const reducer = (usersIndex: UsersIndexExtended, profile: Profile) => {
		const { name, requestStatus } = profile;
		const user: User = {
			name,
			requestStatus
		};

		if (profile.info) {
			const { avatar, profileurl, personaname } = profile.info;

			user.name = personaname;
			user.avatar = avatar;
			user.url = profileurl;
		}

		if (user.requestStatus == 2) {
			user.status = "Профиль не найден";
		}

		if (user.requestStatus == 3) {
			user.status = "Профиль скрыт";
		}

		if (user.requestStatus == 4) {
			user.status = "Игры отсутствуют или скрыты";
		}

		if (user.requestStatus === 1 && profile.info) {
			const { length: gamesCount } = profile.games;
			const gamesTextPlural = plural(gamesCount, ["игра", "игры", "игр"]);

			user.status = `${gamesCount} ${gamesTextPlural}`;

			usersIndex.usersIncluded.push(user);
			usersIndex.profilesIncluded.push(profile);
		} else {
			usersIndex.usersExcluded.push(user);
			usersIndex.profilesExcluded.push(profile);
		}

		return usersIndex;
	};

	return profiles.reduce(reducer, {
		usersIncluded: [],
		usersExcluded: [],
		profilesIncluded: [],
		profilesExcluded: []
	});
};

export const serializeGames = (games: GameDetailSteamApi[]): Game[] => {
	return games.map((game: GameDetailSteamApi) => {
		const { appid: id, name, tags } = game;
		return { id, name, tags };
	});
};

export const serializeCommonGames = (profiles: Profile[]): number[] => {
	interface GameOwners {
		common: number[];
		index: { [key: number]: number };
	}

	const reducer = (gameOwners: GameOwners, profile: Profile) => {
		profile.games.forEach((game: UserGameSteamApi) => {
			const { appid } = game;
			const { [appid]: ownersCount = 0 } = gameOwners.index;
			const incrementedOwners = ownersCount + 1;
			gameOwners.index[appid] = incrementedOwners;

			if (incrementedOwners === profiles.length) {
				gameOwners.common.push(appid);
			}
		});

		return gameOwners;
	};

	const gameOwners = profiles.reduce(reducer, { common: [], index: {} });
	const { common: commonGames } = gameOwners;

	return commonGames;
};
