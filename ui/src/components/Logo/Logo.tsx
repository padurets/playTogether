import * as React from "react";
import Text from "../Text/Text";
import * as styles from "./Logo.css";
import * as Store from "../../services/store";

class Logo extends React.PureComponent {
	private onClick = () => Store.routes.to("/");

	public render() {
		return (
			<div className={styles.root} onClick={this.onClick}>
				<div className={styles.logo}>
					<span className={styles.regularPart}>Steam</span>
					<span className={styles.accentPart}>Together</span>
				</div>
				<Text color="light" size="sm" className={styles.description}>
					Общие мультиплеерные игры
				</Text>
			</div>
		);
	}
}

export default Logo;
