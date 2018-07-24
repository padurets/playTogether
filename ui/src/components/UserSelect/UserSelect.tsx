// import * as classNames from "classnames";
import * as React from "react";
import Button from "../Button/Button";
import Title from "../Title/Title";
import Text from "../Text/Text";
import Pane from "../Pane/Pane";
import * as Store from "../../services/store";
import * as styles from "./UserSelect.css";

interface Props {
	submitButtonText: string;
}

interface State {
	usernames: string[];
	ids: string[];
	errors: string[];
	showErrorInfo: boolean;
	value: string;
}

type StateGroups = keyof State;

export const userSelectLSName = "userSelectForm";

class UserSelect extends React.PureComponent<Props, State> {
	private palceholder =
		"https://steamcommunity.com/id/xxx\nhttps://steamcommunity.com/profiles/xxxxxxxxxxxxxxxxx\n";

	private idRegExp = /(.*)\/profiles\//i;
	private usernameRegExp = /(.*)\/id\//i;

	public componentDidMount() {
		const state = this.makeValidate(this.state.value);

		this.setState(state);
	}

	private getDefaultState = (): State => ({
		usernames: [],
		ids: [],
		errors: [],
		showErrorInfo: false,
		value: localStorage.getItem(userSelectLSName) || ""
	});

	public state = this.getDefaultState();

	private onSubmit = () => {
		const { usernames, ids } = this.state;

		Store.routes.to(
			`/commonGames?usernames=${usernames.join()}&ids=${ids.join()}`
		);
	};

	private getCleanValue = (value: string, regexp: RegExp) =>
		value
			.replace(regexp, "")
			.split("/")[0]
			.replace(/\?(.*)/, "");

	private getIdFromUrl = (url: string) =>
		this.getCleanValue(url, this.idRegExp);

	private getUsernameFromUrl = (url: string) =>
		this.getCleanValue(url, this.usernameRegExp);

	private formatInputUrl = (url: string) => {
		const group: StateGroups = url.match(this.usernameRegExp)
			? "usernames"
			: url.match(this.idRegExp)
				? "ids"
				: "errors";
		const value =
			group === "usernames"
				? this.getUsernameFromUrl(url)
				: group === "ids"
					? this.getIdFromUrl(url)
					: url;

		return {
			group,
			value
		};
	};

	private makeValidate = (value: string) => {
		const splitter = ",";
		const items = value
			.replace(/\n| |\t|,"/g, splitter)
			.split(splitter)
			.filter(item => !!value);
		const state = items.reduce((state, item) => {
			if (item !== "") {
				const { value, group } = this.formatInputUrl(item);

				if (state[group].indexOf(value) < 0) {
					state[group].push(value);
				}
			}

			return state;
		}, this.getDefaultState());

		// ограничить 100 игроками

		return state;
	};

	private onChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
		const { value } = e.currentTarget;
		const state = this.makeValidate(value);
		const showErrorInfo =
			this.state.errors.length && !state.errors.length
				? false
				: this.state.showErrorInfo;

		if (!state.errors.length) {
			localStorage.setItem(userSelectLSName, value);
		}

		console.log("value", value);

		this.setState({ ...state, value, showErrorInfo });
	};

	private onBlur = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
		const { value } = e.currentTarget;
		const state = this.makeValidate(value);
		const showErrorInfo = !!state.errors.length;

		if (!showErrorInfo) {
			localStorage.setItem(userSelectLSName, value);
		}

		this.setState({ ...state, value, showErrorInfo });
	};

	public render() {
		const { submitButtonText } = this.props;
		const { usernames, ids, errors, showErrorInfo, value } = this.state;
		const values = [...usernames, ...ids];
		const disableSubmit = values.length < 2 || errors.length > 0;

		return (
			<div className={styles.root}>
				<textarea
					onChange={this.onChange}
					onBlur={this.onBlur}
					placeholder={this.palceholder}
					className={styles.textarea}
					value={value}
				/>
				{!showErrorInfo ? null : (
					<Pane type="danger">
						<Title type="h5" weight="normal">
							Некорректные данные:
						</Title>
						<ol className={styles.errorList}>
							{errors.map((item, i) => (
								<li key={i}>
									<Text size="sm">{item}</Text>
								</li>
							))}
						</ol>
					</Pane>
				)}
				<div className={styles.formFooter}>
					<Button disabled={disableSubmit} onClick={this.onSubmit}>
						{submitButtonText}
					</Button>
				</div>
			</div>
		);
	}
}

export default UserSelect;
