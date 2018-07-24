import * as React from "react";
import * as cn from "classnames";
import * as styles from "./Text.css";

export type Size = "sm" | "rg" | "lg";
export type Weight = "normal" | "bold" | "lighter";
export type Color =
	| "regular"
	| "primary"
	| "light"
	| "warning"
	| "danger"
	| "success";

interface Props extends React.HTMLAttributes<HTMLTitleElement> {
	size?: Size;
	weight?: Weight;
	color?: Color;
}

class Text extends React.PureComponent<Props> {
	public render() {
		const {
			children,
			className,
			size = "rg",
			weight = "normal",
			color
		} = this.props;
		const rootClasses = cn(className, styles.root, {
			[styles.colorPrimary]: color === "primary",
			[styles.colorLight]: color === "light",
			[styles.colorWarning]: color === "warning",
			[styles.colorDanger]: color === "danger",
			[styles.colorSuccess]: color === "success",
			[styles.sizeSm]: size === "sm",
			[styles.sizeRg]: size === "rg",
			[styles.sizeLg]: size === "lg",
			[styles.weightNormal]: weight === "normal",
			[styles.weightBold]: weight === "bold",
			[styles.weightLight]: weight === "lighter"
		});

		return <span className={rootClasses}>{children}</span>;
	}
}

export default Text;
