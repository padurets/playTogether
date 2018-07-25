import * as React from "react";
import * as cn from "classnames";
import * as queryString from "query-string";
import * as sort from "fast-sort";
import Layout from "../../components/Layout/Layout";
import CollapseWidget from "../../components/CollapseWidget/CollapseWidget";
import GamesList from "../../components/GamesList/GamesList";
import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";
import User from "../../components/User/User";
import Pane from "../../components/Pane/Pane";
import * as UserSelect from "../../components/UserSelect/UserSelect";
import * as Store from "../../services/store";
import * as CommonGames from "../../../../api/src/methods/commonGames/types";
import * as styles from "./Catalog.css";

interface Props {
	status: Store.Status;
	games?: CommonGames.Game[];
	usersIncluded: CommonGames.User[];
	usersExcluded: CommonGames.User[];
	router: Store.Router;
	errorMessage: CommonGames.ErrorMessage;
}

export class Catalog extends React.PureComponent<Props> {
	public componentDidMount() {
		const { router } = this.props;
		const { usernames = "", ids = "" } = queryString.parse(
			router.location.search
		);

		if (usernames.length) {
			Store.dispatch(Store.commonGames.list(usernames, ids));
		}
	}

	private queryUsernamesToUrls = (usernames: string): string => {
		return usernames
			.split(",")
			.map(username => `https://steamcommunity.com/id/${username}`)
			.join("\n");
	};

	private queryIdsToUrls = (ids: string): string => {
		return ids
			.split(",")
			.map(id => `https://steamcommunity.com/profiles/${id}`)
			.join("\n");
	};

	private queryParamsToUrls = (): string => {
		const { router } = this.props;
		const { usernames, ids } = queryString.parse(router.location.search);
		const usernamesUrl = usernames ? this.queryUsernamesToUrls(usernames) : "";
		const idsUrl = ids ? this.queryIdsToUrls(ids) : "";
		const splitter = ids ? "\n" : "";

		return usernamesUrl + splitter + idsUrl;
	};

	private onClickOther = () => {
		const value = this.queryParamsToUrls();
		localStorage.setItem(UserSelect.userSelectLSName, value);

		Store.routes.to(`/`);
	};

	public render() {
		const { status, errorMessage } = this.props;
		const rootClassNames = cn(styles.root);

		if (status.isInit || status.isPending) {
			return <Layout isLoading={true} />;
		}

		if (status.isFail) {
			return <Layout isFail={true} />;
		}
		const usersIncludeInSearch = sort(this.props.usersIncluded).asc("name");
		const usersExcludedFromSearch = sort(this.props.usersExcluded).desc(
			"statusCode"
		);
		const games = sort(this.props.games as CommonGames.Game[]).asc("name");

		return (
			<Layout>
				<div className={rootClassNames}>
					<div className={styles.leftColumn}>
						<div className={styles.leftColumnlayout}>
							<CollapseWidget
								isExpanded={true}
								title={`Выбранные профили (${usersIncludeInSearch.length})`}
							>
								{usersIncludeInSearch.map(
									(user: CommonGames.User, i: number) => (
										<User {...user} key={i} />
									)
								)}
							</CollapseWidget>
							{!usersExcludedFromSearch.length ? null : (
								<CollapseWidget
									title={`Исключены из поиска (${
										usersExcludedFromSearch.length
									})`}
								>
									{usersExcludedFromSearch.map(
										(user: CommonGames.User, i: number) => (
											<User {...user} key={i} />
										)
									)}
								</CollapseWidget>
							)}

							<Button isFluid={true} onClick={this.onClickOther}>
								Изменить список
							</Button>
						</div>
					</div>
					<div className={styles.rightColumn}>
						{errorMessage ? (
							<Pane className={styles.errorPane} offset={false} type="warning">
								{errorMessage}
							</Pane>
						) : (
							<>
								<Title type="h3" className={styles.rightColumnTitle}>
									Общие мультиплеерные игры в steam{" "}
									<span>({games.length})</span>:
								</Title>
								<GamesList games={games} />
							</>
						)}
					</div>
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = (state: Store.States) => {
	const { commonGames, router } = state;
	const { payload, status } = commonGames;

	if (status.isSuccess && payload) {
		const { games, usersIncluded, usersExcluded, errorMessage } = payload;

		return {
			games,
			usersIncluded,
			usersExcluded,
			status,
			router,
			errorMessage
		};
	}

	return { status, router };
};

export default Store.connect(
	mapStateToProps,
	Catalog
);
