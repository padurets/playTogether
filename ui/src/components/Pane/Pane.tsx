import * as React from "react";
import * as cn from "classnames";
import * as styles from "./Pane.css";

type PaneType = "danger" | "warning";

interface Props extends React.HTMLAttributes<HTMLTitleElement> {
	type: PaneType;
	offset?: boolean;
}

class Pane extends React.PureComponent<Props> {
	public render() {
		const { children, className, type, offset = true } = this.props;
		const rootClasses = cn(className, styles.root, {
			[styles.danger]: type === "danger",
			[styles.warning]: type === "warning",
			[styles.offset]: offset
		});

		return <div className={rootClasses}>{children}</div>;
	}
}

export default Pane;
