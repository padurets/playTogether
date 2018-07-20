import * as React from "react";
import * as cn from "classnames";
import * as queryString from "query-string";
import Layout from "../Layout/Layout";
import GamesList from "../GamesList/GamesList";
import Button from "../Button/Button";
import * as Store from "../../services/store";
import * as CommonGamesApi from "../../../../api/src/methods/commonGames/types";
import * as styles from "./Catalog.css";

interface Props {
	status: Store.Status;
	games?: CommonGamesApi.Games;
	usernames: string[];
}

export class Catalog extends React.PureComponent<Props> {
	public componentDidMount() {
		const { usernames } = this.props;
		if (usernames.length) {
			Store.dispatch(Store.commonGames.list(usernames));
		}
	}

	public render() {
		const { usernames, status, games } = this.props;
		const rootClassNames = cn(styles.root);

		if (status.isInit || status.isPending) {
			return <Layout isLoading={true} />;
		}

		if (status.isFail || typeof games === "undefined") {
			return <Layout isFail={true} />;
		}

		return (
			<Layout>
				<div className={rootClassNames}>
					<h2>Пользователи:</h2>
					<span className={styles.users}>{usernames.join(", ")}</span>
					<Button href="/">Указать других</Button>
					<h2>
						Общие мультиплеерные игры в steam <span>({games.length})</span>:
					</h2>
					<GamesList games={games} />
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = (state: Store.States) => {
	const { commonGames, router } = state;
	const { users = "" } = queryString.parse(router.location.search);
	const usernames = users.split(",");
	return { games: commonGames.payload, status: commonGames.status, usernames };
};

export default Store.connect(
	mapStateToProps,
	Catalog
);
