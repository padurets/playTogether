// import * as classNames from "classnames";
import * as React from "react";
import * as styles from "./UserSelect.css";

class UserSelect extends React.PureComponent {
	public render() {
		return (
			<div>
				<textarea
					placeholder="Enter logins or profile url"
					className={styles.textarea}
				/>
			</div>
		);
	}
}

export default UserSelect;
