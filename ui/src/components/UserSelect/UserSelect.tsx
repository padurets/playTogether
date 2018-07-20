// import * as classNames from "classnames";
import * as React from "react";
import Layout from "../Layout/Layout";
import Button from "../Button/Button";
import * as Store from "../../services/store";
import * as styles from "./UserSelect.css";

interface State {
	usernames: string[];
}

class UserSelect extends React.PureComponent<{}, State> {
	public state = {
		usernames: []
	};

	private onSubmit = () => {
		const { usernames } = this.state;
		Store.routes.to(`/commonGames?users=${usernames.join()}`);
	};

	private onChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
		const { value } = e.currentTarget;
		const usernames = value.split("\n").filter(value => !!value);

		this.setState({ usernames });
	};

	public render() {
		const { usernames } = this.state;
		const palceholder = "name1\nname2\nname3";
		const disableSubmit = usernames.length < 2;

		return (
			<Layout className={styles.root}>
				<h2>Введите логины пользователей steam:</h2>
				<textarea
					onChange={this.onChange}
					placeholder={palceholder}
					className={styles.textarea}
				/>
				<div className={styles.submit}>
					<div className={styles.note}>*каждый логин с новой строки</div>
					<Button disabled={disableSubmit} onClick={this.onSubmit}>
						Выбрать
					</Button>
				</div>
			</Layout>
		);
	}
}

export default UserSelect;
