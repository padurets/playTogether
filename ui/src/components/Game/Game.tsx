import * as React from "react";
import * as CommonGamesApi from "../../../../api/src/methods/commonGames/types";
import * as styles from "./Game.css";

interface Props {
	info: CommonGamesApi.Game;
}

export class Game extends React.PureComponent<Props> {
	public render() {
		const { name, id } = this.props.info;

		return (
			<a
				href={`https://steamcommunity.com/app/${id}`}
				target="blank"
				className={styles.root}
			>
				<div className={styles.preview}>
					<img
						src={`https://steamcdn-a.akamaihd.net/steam/apps/${id}/header.jpg`}
					/>
				</div>
				<div className={styles.title}>{name}</div>
			</a>
		);
	}
}

export default Game;
