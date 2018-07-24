import * as React from "react";
import Text from "../Text/Text";
import * as styles from "./Logo.css";

class Logo extends React.PureComponent {
	public render() {
		return (
			<div className={styles.root}>
				<div className={styles.logo}>
					<span className={styles.regularPart}>Play</span>
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
