import * as React from "react";
import * as cn from "classnames";
import * as styles from "./Title.css";
import * as textStyles from "../Text/Text.css";
import * as Text from "../Text/Text";

type TitleType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type Weight = "normal" | "bold" | "lighter";

interface Props extends React.HTMLAttributes<HTMLTitleElement> {
	type: TitleType;
	weight?: Weight;
	color?: Text.Color;
}

class Title extends React.PureComponent<Props> {
	public render() {
		const { type, children, className, color, weight = "bold" } = this.props;
		const Tag = type;
		const rootClasses = cn(className, styles.root, {
			[styles.h1]: type === "h1",
			[styles.h2]: type === "h2",
			[styles.h3]: type === "h3",
			[styles.h4]: type === "h4",
			[styles.h5]: type === "h5",
			[styles.h6]: type === "h6",
			[styles.weightNormal]: weight === "normal",
			[styles.weightBold]: weight === "bold",
			[styles.weightLight]: weight === "lighter",
			[textStyles.colorPrimary]: color === "primary",
			[textStyles.colorLight]: color === "light",
			[textStyles.colorWarning]: color === "warning",
			[textStyles.colorDanger]: color === "danger",
			[textStyles.colorSuccess]: color === "success"
		});

		return <Tag className={rootClasses}>{children}</Tag>;
	}
}

export default Title;
