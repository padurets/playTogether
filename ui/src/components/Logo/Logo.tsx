import * as React from "react";
import * as styles from "./Logo.css";

class Logo extends React.PureComponent {
	public render() {
		return (
			<div className={styles.root}>
				<div className={styles.logo}>
					<span className={styles.regularPart}>Play</span>
					<span className={styles.accentPart}>Together</span>
				</div>
				{/* <div className={styles.description}>in your common games in steam</div> */}
			</div>
		);
	}
}

export default Logo;
