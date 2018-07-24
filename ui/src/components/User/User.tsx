import * as React from "react";
import * as cn from "classnames";
import * as UsersInfo from "../../../../api/src/services/steam/getUsersInfo/types";
import Text from "../Text/Text";
import * as styles from "./User.css";

interface Props
	extends React.HTMLAttributes<HTMLDivElement>,
		UsersInfo.UserInfo {}

class User extends React.PureComponent<Props> {
	public render() {
		const {
			className,
			name,
			avatar = require("./img/default_user.jpg"),
			url,
			status,
			statusCode
		} = this.props;
		const Tag = url ? "a" : "div";
		const mixedProps = url ? { href: url, target: "blank" } : {};
		const rootClasses = cn(className, styles.root, {
			[styles.pointered]: !!url
			// [styles.warning]: statusCode !== 1
		});

		console.log("avatar", avatar);

		return (
			<Tag {...mixedProps} className={rootClasses}>
				<span className={styles.avatar}>
					<img src={avatar} alt={name} />
				</span>
				<span className={styles.profileInfo}>
					<Text className={styles.name}>{name}</Text>
					{statusCode === 1 ? null : (
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
