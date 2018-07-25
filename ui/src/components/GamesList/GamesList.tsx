import * as React from "react";
import * as CommonGamesApi from "../../../../api/src/methods/commonGames/types";
import Game from "../Game/Game";
import * as styles from "./GamesList.css";

interface Props {
	games: CommonGamesApi.Game[];
}

export class GamesList extends React.PureComponent<Props> {
	public render() {
		const { games } = this.props;

		return (
			<div className={styles.root}>
				{games.map(gameInfo => <Game key={gameInfo.id} info={gameInfo} />)}
			</div>
		);
	}
}

export default GamesList;
