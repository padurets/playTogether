import * as React from "react";
import * as cn from "classnames";
import * as CommonGamesApi from "../../../../api/src/methods/commonGames/types";
import Text from "../Text/Text";
import * as styles from "./User.css";

interface Props
	extends React.HTMLAttributes<HTMLDivElement>,
		CommonGamesApi.User {}

class User extends React.PureComponent<Props> {
	public render() {
		const {
			className,
			name,
			avatar = require("./img/default_user.jpg"),
			url,
			status,
			requestStatus
		} = this.props;
		const Tag = url ? "a" : "div";
		const mixedProps = url ? { href: url, target: "blank" } : {};
		const rootClasses = cn(className, styles.root, {
			[styles.pointered]: !!url
		});

		return (
			<Tag {...mixedProps} className={rootClasses}>
				<span className={styles.avatar}>
					<img src={avatar} alt={name} />
				</span>
				<span className={styles.profileInfo}>
					<Text className={styles.name}>{name}</Text>
					{requestStatus === 1 ? null : (
						<Text size="sm" color="danger">
							{status}
						</Text>
					)}
				</span>
			</Tag>
		);
	}
}

export default User;
