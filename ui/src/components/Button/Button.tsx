import * as classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";
import * as styles from "./Button.css";

const COLORS = {
	primary: "primary"
};

type Color = "primary";

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	color?: Color;
	href?: string;
	disabled?: boolean;
}

class Button extends React.PureComponent<Props> {
	public render() {
		const {
			children,
			color = COLORS.primary,
			className,
			href,
			...props
		} = this.props;
		const classes = classNames(
			styles.button,
			{
				[styles.primary]: color === COLORS.primary
			},
			className
		);

		return href ? (
			<Link {...props} className={classes} to={href}>
				{children}
			</Link>
		) : (
			<button {...props} className={classes}>
				{children}
			</button>
		);
	}
}

export default Button;
